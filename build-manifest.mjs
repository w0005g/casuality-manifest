// Generates hosting/manifest.json from games.config.json by computing each file's size and sha256.
// Run after adding or changing a game:  npm run manifest
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(readFileSync(join(here, 'games.config.json'), 'utf8'));

const games = config.map(({ file, ...meta }) => {
  const bytes = readFileSync(join(here, file));
  return {
    ...meta,
    url: file, // relative to manifest.json; the app resolves it
    sha256: createHash('sha256').update(bytes).digest('hex'),
    sizeBytes: bytes.length,
  };
});

writeFileSync(join(here, 'manifest.json'), JSON.stringify({ schemaVersion: 1, games }, null, 2) + '\n');
console.log(`manifest.json written with ${games.length} game(s)`);
