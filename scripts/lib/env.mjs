import { readFile, writeFile } from 'node:fs/promises';

const ENV_FILE = new URL('../../.env.local', import.meta.url);

// Reads KEY=value pairs from .env.local, letting real environment variables (CI secrets) win.
export async function loadEnv() {
  let text = '';
  try {
    text = await readFile(ENV_FILE, 'utf8');
  } catch {
    // No local file in CI; secrets come from process.env.
  }
  const fromFile = Object.fromEntries(
    text
      .split(/\r?\n/)
      .map((line) => line.match(/^([A-Z0-9_]+)=(.*)$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.trim().replace(/^(['"])(.*)\1$/, '$2')])
  );
  return { ...fromFile, ...Object.fromEntries(Object.entries(process.env).filter(([, v]) => v)) };
}

// Sets (or replaces) one KEY=value line in .env.local without touching the others.
export async function setEnvValue(key, value) {
  let text = '';
  try {
    text = await readFile(ENV_FILE, 'utf8');
  } catch {
    // Created below.
  }
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, 'm');
  text = pattern.test(text) ? text.replace(pattern, line) : `${text.replace(/\s*$/, '')}\n${line}\n`;
  await writeFile(ENV_FILE, text.replace(/^\n/, ''));
}
