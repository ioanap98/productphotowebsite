import fs from 'node:fs/promises';
import path from 'node:path';
import { prepareHeroImage } from '../lib/hero-assets.mjs';

const manifest = { web: [], mobile: [] };
for (const bucket of ['web', 'mobile']) {
  const directory = path.join(process.cwd(), 'public/uploads', bucket);
  const entries = await fs.readdir(directory, { withFileTypes: true }).catch((error) => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  const files = entries.filter((entry) => entry.isFile() && !entry.name.startsWith('.') && /\.(jpe?g|png|webp|avif|gif|svg)$/i.test(entry.name));
  files.sort((a, b) => a.name.localeCompare(b.name));
  for (const file of files) manifest[bucket].push(await prepareHeroImage(bucket, file.name));
  console.log(`Prepared ${files.length} ${bucket} hero images.`);
}

await fs.mkdir('.generated', { recursive: true });
await fs.writeFile('.generated/hero.json', JSON.stringify(manifest));
