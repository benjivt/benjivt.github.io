// Pulls Benji's recently played songs, heavy rotation and profile playlists from the Apple Music API
// into public/data/music.json, which the Music card in the room reads.
// Needs APPLE_TEAM_ID, APPLE_KEY_ID, the MusicKit key, and APPLE_MUSIC_USER_TOKEN (npm run music:auth).
// Run: npm run fetch:music
import { mkdir, writeFile } from 'node:fs/promises';
import { developerToken } from './lib/apple-music.mjs';
import { loadEnv } from './lib/env.mjs';

const OUT_DIR = new URL('../public/data/', import.meta.url);
const OUT = new URL('music.json', OUT_DIR);
const API = 'https://api.music.apple.com/v1';
const ART_SIZE = 200;

const env = await loadEnv();
if (!env.APPLE_MUSIC_USER_TOKEN) {
  console.error('No APPLE_MUSIC_USER_TOKEN yet (run npm run music:auth). Skipping; existing music.json is unchanged.');
  process.exit(0);
}

async function get(path, headers) {
  const res = await fetch(`${API}${path}`, { headers });
  if (res.status === 401 || res.status === 403) {
    throw new Error(`${path} -> HTTP ${res.status}. The Music-User-Token has probably expired; rerun npm run music:auth.`);
  }
  if (!res.ok) throw new Error(`${path} -> HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

const artwork = (art) => (art?.url ? art.url.replace('{w}', ART_SIZE).replace('{h}', ART_SIZE) : null);

// Songs played from the library come back as library-songs, which have no public link;
// their catalog match (include=catalog) supplies one when Apple has it.
const song = (item) => {
  const catalog = item.relationships?.catalog?.data?.[0]?.attributes;
  return {
    name: item.attributes?.name,
    artist: item.attributes?.artistName,
    album: item.attributes?.albumName ?? null,
    artwork: artwork(catalog?.artwork ?? item.attributes?.artwork),
    url: item.attributes?.url ?? catalog?.url ?? null,
  };
};

// Heavy rotation and recently played mix albums, playlists and stations; keep albums and playlists.
const rotationItem = (item) => ({
  name: item.attributes?.name?.trim(),
  artist: item.attributes?.artistName ?? item.attributes?.curatorName ?? null,
  kind: item.type?.replace('library-', '').replace(/s$/, ''),
  artwork: artwork(item.attributes?.artwork),
  url: item.attributes?.url ?? null,
});

// Public playlists to leave off the site anyway, by exact name.
const HIDDEN_PLAYLISTS = [];
const CATALOG_BATCH = 10;
const HEAVY_ROTATION_SIZE = 3;
const RECENT_SIZE = 5;
// Only the newest few playlists reach the site; the full list still lends covers to heavy rotation.
const PLAYLIST_SIZE = 9;

// The playlists on Benji's Apple Music profile are the public ones in his library, newest edits first.
async function profilePlaylists(headers) {
  const library = [];
  let next = '/me/library/playlists?limit=100';
  while (next) {
    const page = await get(next, headers);
    library.push(...(page.data ?? []));
    next = page.next?.replace(/^\/v1/, '') ?? null;
  }
  const mine = library
    .filter((p) => p.attributes?.isPublic && p.attributes?.playParams?.globalId)
    .filter((p) => !HIDDEN_PLAYLISTS.includes(p.attributes.name.trim()))
    .sort((a, b) => (b.attributes.lastModifiedDate ?? '').localeCompare(a.attributes.lastModifiedDate ?? ''));

  // The catalog copy carries the public link, the cover and the first tracks.
  const { data: [storefront] = [] } = await get('/me/storefront', headers);
  const ids = mine.map((p) => p.attributes.playParams.globalId);
  const catalog = new Map();
  for (let i = 0; i < ids.length; i += CATALOG_BATCH) {
    const batch = ids.slice(i, i + CATALOG_BATCH).join(',');
    const page = await get(`/catalog/${storefront?.id ?? 'us'}/playlists?ids=${batch}&include=tracks`, headers);
    for (const p of page.data ?? []) catalog.set(p.id, p);
  }

  return mine
    .map((p) => catalog.get(p.attributes.playParams.globalId))
    .filter(Boolean)
    .map((p) => {
      const tracks = p.relationships?.tracks;
      // Playlists without a cover get Apple's 2x2 mosaic of their first album covers.
      const mosaic = [...new Set((tracks?.data ?? []).map((t) => artwork(t.attributes?.artwork)).filter(Boolean))].slice(0, 4);
      return {
        name: p.attributes.name.trim(),
        url: p.attributes.url ?? null,
        artwork: artwork(p.attributes.artwork),
        mosaic: p.attributes.artwork ? [] : mosaic,
        trackCount: tracks?.data?.length ?? 0,
        moreTracks: Boolean(tracks?.next),
      };
    });
}

try {
  const headers = {
    Authorization: `Bearer ${await developerToken(env)}`,
    'Music-User-Token': env.APPLE_MUSIC_USER_TOKEN,
  };
  const [recent, rotation, recentContainers, playlists] = await Promise.all([
    get('/me/recent/played/tracks?limit=10&types=songs,library-songs&include=catalog', headers),
    get('/me/history/heavy-rotation?limit=10', headers),
    get('/me/recent/played?limit=10', headers),
    profilePlaylists(headers),
  ]);
  // Apple's heavy rotation is often short, so top it up with recently played albums and playlists.
  // Library playlists have no public link or cover of their own; borrow them from the profile playlist.
  const profileByName = new Map(playlists.map((p) => [p.name, p]));
  const rotationSeen = new Set();
  const heavyRotation = [...(rotation.data ?? []), ...(recentContainers.data ?? [])]
    .map(rotationItem)
    .filter((r) => r.name && (r.kind === 'album' || r.kind === 'playlist'))
    .filter((r) => !HIDDEN_PLAYLISTS.includes(r.name))
    .filter((r) => !rotationSeen.has(r.name) && rotationSeen.add(r.name))
    .map((r) => {
      const profile = profileByName.get(r.name);
      return {
        ...r,
        artwork: r.artwork ?? profile?.artwork ?? null,
        mosaic: profile?.mosaic ?? [],
        url: r.url ?? profile?.url ?? null,
        trackCount: profile?.trackCount ?? null,
        moreTracks: profile?.moreTracks ?? false,
      };
    })
    .slice(0, HEAVY_ROTATION_SIZE);
  const seen = new Set();
  const data = {
    recent: (recent.data ?? [])
      .map(song)
      .filter((s) => s.name && !seen.has(`${s.name}|${s.artist}`) && seen.add(`${s.name}|${s.artist}`))
      .slice(0, RECENT_SIZE),
    heavyRotation,
    playlists: playlists.slice(0, PLAYLIST_SIZE),
    updatedAt: new Date().toISOString(),
  };
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(OUT, `${JSON.stringify(data, null, 2)}\n`);
  console.log(
    `Wrote ${data.recent.length} recent songs, ${data.heavyRotation.length} heavy-rotation items and ${data.playlists.length} playlists`
  );
} catch (error) {
  // Keep the last good file so the site never loses its data because of one bad fetch.
  console.error(`Apple Music fetch failed, keeping the existing music.json: ${error.message}`);
  process.exit(process.env.CI ? 1 : 0);
}
