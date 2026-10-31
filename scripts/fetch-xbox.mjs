// Pulls Benji's public Xbox profile and recently played games from OpenXBL (https://xbl.io)
// into public/data/xbox.json, which the Gaming card in the room reads.
// Needs OPENXBL_KEY (env var, or a line in .env.local). Run: npm run fetch:xbox
import { readFile, writeFile, mkdir } from 'node:fs/promises';

const OUT_DIR = new URL('../public/data/', import.meta.url);
const OUT = new URL('xbox.json', OUT_DIR);
const API = 'https://xbl.io/api/v2';
const RECENT_COUNT = 6;
const CATALOG = 'https://displaycatalog.mp.microsoft.com/v7.0/products/lookup';

async function readKey() {
  if (process.env.OPENXBL_KEY) return process.env.OPENXBL_KEY.trim();
  try {
    const env = await readFile(new URL('../.env.local', import.meta.url), 'utf8');
    return env.match(/^OPENXBL_KEY=(.+)$/m)?.[1]?.trim();
  } catch {
    return undefined;
  }
}

async function get(path, key) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'X-Authorization': key, Accept: 'application/json', 'Accept-Language': 'en-US' },
  });
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  // OpenXBL wraps payloads as { content, code } and reports upstream errors in `code`.
  const body = await res.json();
  if (body.code && body.code !== 200) throw new Error(`${path} -> ${body.code}: ${JSON.stringify(body.content).slice(0, 200)}`);
  return body.content ?? body;
}

// Store images come back as http:// URLs, which an https site can't load.
const https = (url) => (url ? url.replace(/^http:\/\//, 'https://') : null);

// The account endpoint returns Xbox profile "settings" as [{ id, value }] pairs.
function profileFrom(account) {
  const user = account.profileUsers?.[0] ?? account;
  const settings = Object.fromEntries((user.settings ?? []).map((s) => [s.id, s.value]));
  return {
    xuid: user.id,
    gamertag: settings.Gamertag ?? settings.ModernGamertag,
    gamerscore: Number(settings.Gamerscore ?? 0),
    avatar: https(settings.GameDisplayPicRaw),
  };
}

const baseName = (name) =>
  name
    .replace(/[®™]/g, '')
    .replace(/\s+(for windows( 10)?|for pc|- launcher)$/i, '')
    .trim()
    .toLowerCase();

function recentFrom(history) {
  const games = (history.titles ?? []).filter((t) => t.type === 'Game' && t.titleHistory?.lastTimePlayed);
  return games
    // Launchers (e.g. "Call of Duty - Launcher") duplicate the game they open.
    .filter((t) => !/launcher/i.test(t.name))
    .sort((a, b) => new Date(b.titleHistory?.lastTimePlayed ?? 0) - new Date(a.titleHistory?.lastTimePlayed ?? 0))
    // Same game on another platform ("Minecraft" vs "Minecraft for Windows"): keep the most recent.
    .filter((t, i, all) => all.findIndex((o) => baseName(o.name) === baseName(t.name)) === i)
    .slice(0, RECENT_COUNT)
    .map((t) => ({
      name: t.name,
      lastPlayed: t.titleHistory?.lastTimePlayed ?? null,
      image: https(t.displayImage),
      // Every platform's title id for this game, for the poster lookup below.
      titleIds: games.filter((o) => baseName(o.name) === baseName(t.name)).map((o) => o.titleId),
      achievements: t.achievement
        ? { earned: t.achievement.currentAchievements ?? 0, gamerscore: t.achievement.currentGamerscore ?? 0 }
        : null,
    }));
}

// Portrait store art (2:3, like a game library), from the public Microsoft Store catalog.
// Not every platform's title id is in the catalog, so try each until one has a poster.
async function posterFor(titleIds) {
  for (const id of titleIds) {
    const url = `${CATALOG}?alternateId=XboxTitleId&value=${id}&market=US&languages=en-us&fieldsTemplate=details`;
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const images = (await res.json()).Products?.[0]?.LocalizedProperties?.[0]?.Images ?? [];
      const poster = images.find((img) => img.ImagePurpose === 'Poster');
      if (poster?.Uri) return `https:${poster.Uri.replace(/^https?:/, '')}`;
    } catch {
      // Try the next id; the square display image is the fallback.
    }
  }
  return null;
}

async function withPosters(recent) {
  return Promise.all(
    recent.map(async ({ titleIds, ...game }) => ({ ...game, poster: await posterFor(titleIds) }))
  );
}

const key = await readKey();
if (!key) {
  console.error('No OPENXBL_KEY found (env var or .env.local). Skipping; existing xbox.json is unchanged.');
  process.exit(0);
}

try {
  const account = await get('/account', key);
  const profile = profileFrom(account);
  const history = await get(`/player/titleHistory/${profile.xuid}`, key);
  const data = { ...profile, recent: await withPosters(recentFrom(history)), updatedAt: new Date().toISOString() };
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Wrote ${data.gamertag}: ${data.gamerscore}G, ${data.recent.length} recent games`);
} catch (error) {
  // Keep the last good file so the site never loses its data because of one bad fetch.
  console.error(`Xbox fetch failed, keeping the existing xbox.json: ${error.message}`);
  process.exit(process.env.CI ? 1 : 0);
}
