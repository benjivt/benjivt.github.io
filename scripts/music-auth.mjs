// One-time: sign in to Apple Music in the browser and save the resulting Music-User-Token
// to .env.local (APPLE_MUSIC_USER_TOKEN). Apple expires it after roughly six months; rerun then.
// Run: npm run music:auth   then open the printed URL.
import { createServer } from 'node:http';
import { developerToken } from './lib/apple-music.mjs';
import { loadEnv, setEnvValue } from './lib/env.mjs';

const PORT = 5180;
const env = await loadEnv();
const devToken = await developerToken(env, { days: 1 });

const page = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Connect Apple Music</title>
<style>
  body { font: 16px system-ui, sans-serif; background: #141019; color: #f4eef8; display: grid; place-items: center; min-height: 100vh; margin: 0; }
  main { max-width: 420px; text-align: center; }
  button { font: inherit; font-weight: 700; padding: 14px 26px; border: 0; border-radius: 999px; background: #fa2d48; color: #fff; cursor: pointer; }
  p { color: #c9bfd3; line-height: 1.5; }
</style>
<script src="https://js-cdn.music.apple.com/musickit/v3/musickit.js" async></script>
</head><body><main>
  <h1>Connect Apple Music</h1>
  <p>Lets the portfolio show what you've been listening to. The token is saved to .env.local on this computer only.</p>
  <button id="go" disabled>Loading MusicKit…</button>
  <p id="status"></p>
</main>
<script>
  const button = document.getElementById('go');
  const status = document.getElementById('status');
  document.addEventListener('musickitloaded', async () => {
    await MusicKit.configure({ developerToken: ${JSON.stringify(devToken)}, app: { name: 'Benji portfolio', build: '1.0.0' } });
    button.disabled = false;
    button.textContent = 'Authorize Apple Music';
  });
  button.addEventListener('click', async () => {
    try {
      const userToken = await MusicKit.getInstance().authorize();
      const res = await fetch('/token', { method: 'POST', body: userToken });
      status.textContent = res.ok ? 'Saved. You can close this tab.' : 'Could not save the token.';
      button.disabled = true;
    } catch (error) {
      status.textContent = 'Authorization was cancelled or failed: ' + error;
    }
  });
</script></body></html>`;

const server = createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/token') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      const token = body.trim();
      if (!token) {
        res.writeHead(400).end();
        return;
      }
      await setEnvValue('APPLE_MUSIC_USER_TOKEN', token);
      res.writeHead(200).end('ok');
      console.log('Saved APPLE_MUSIC_USER_TOKEN to .env.local');
      setTimeout(() => server.close(), 200);
    });
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(page);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Open http://127.0.0.1:${PORT} and click "Authorize Apple Music".`);
});
