import { createPrivateKey, sign } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const b64url = (input) => Buffer.from(input).toString('base64url');

// The MusicKit private key comes from APPLE_MUSIC_PRIVATE_KEY (PEM text, used in CI)
// or APPLE_MUSIC_KEY_PATH (path to the downloaded AuthKey_XXXX.p8, used locally).
async function privateKey(env) {
  if (env.APPLE_MUSIC_PRIVATE_KEY) return env.APPLE_MUSIC_PRIVATE_KEY.replace(/\\n/g, '\n');
  if (env.APPLE_MUSIC_KEY_PATH) return readFile(env.APPLE_MUSIC_KEY_PATH, 'utf8');
  throw new Error('Set APPLE_MUSIC_KEY_PATH (or APPLE_MUSIC_PRIVATE_KEY) in .env.local');
}

// Signs an Apple Music developer token: an ES256 JWT from the MusicKit key.
export async function developerToken(env, { days = 30 } = {}) {
  if (!env.APPLE_TEAM_ID || !env.APPLE_KEY_ID) throw new Error('Set APPLE_TEAM_ID and APPLE_KEY_ID in .env.local');
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'ES256', kid: env.APPLE_KEY_ID }));
  const payload = b64url(JSON.stringify({ iss: env.APPLE_TEAM_ID, iat: now, exp: now + days * 86400 }));
  const key = createPrivateKey(await privateKey(env));
  const signature = sign('sha256', Buffer.from(`${header}.${payload}`), { key, dsaEncoding: 'ieee-p1363' });
  return `${header}.${payload}.${b64url(signature)}`;
}
