import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import sharp from 'sharp';

const OUTPUT_DIRECTORY = 'public/generated/hero';
const VERSION = 'v1';

/**
 * @typedef {{ src: string, srcSet: string, preview: string }} HeroImage
 */

/**
 * Create responsive files once; subsequent requests only read the small manifest.
 * The cache key changes when an original is replaced or encoding settings change.
 * @param {'web' | 'mobile'} bucket
 * @param {string} filename
 * @returns {Promise<HeroImage>}
 */
export async function prepareHeroImage(bucket, filename) {
  const source = path.join(process.cwd(), 'public/uploads', bucket, filename);
  const stat = await fs.stat(source);
  const key = createHash('sha256')
    .update(`${VERSION}:${bucket}:${filename}:${stat.size}:${stat.mtimeMs}`)
    .digest('hex').slice(0, 24);
  const output = path.join(process.cwd(), OUTPUT_DIRECTORY);
  const manifest = path.join(output, `${key}.json`);

  try {
    return JSON.parse(await fs.readFile(manifest, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT' && !(error instanceof SyntaxError)) throw error;
  }

  // Preserve animation and vector formats without converting them to still photos.
  if (/\.(gif|svg)$/i.test(filename)) {
    const src = `/uploads/${bucket}/${encodeURIComponent(filename)}`;
    return { src, srcSet: '', preview: '' };
  }

  await fs.mkdir(output, { recursive: true });
  const original = await fs.readFile(source);
  const widths = bucket === 'mobile' ? [480, 768, 1080] : [960, 1440, 1920];
  const variants = [];
  for (const width of widths) {
    const result = await sharp(original).rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 72, effort: 4 })
      .toBuffer({ resolveWithObject: true });
    const name = `${key}-${width}.webp`;
    await fs.writeFile(path.join(output, name), result.data);
    if (!variants.some((variant) => variant.width === result.info.width)) {
      variants.push({ src: `/generated/hero/${name}`, width: result.info.width });
    }
  }
  const preview = await sharp(original).rotate().resize({ width: 32, withoutEnlargement: true })
    .webp({ quality: 40 }).toBuffer();
  const image = {
    src: variants[variants.length - 1].src,
    srcSet: variants.map((variant) => `${variant.src} ${variant.width}w`).join(', '),
    preview: `data:image/webp;base64,${preview.toString('base64')}`,
  };
  // Write the manifest last so it only references completed image files.
  const temporaryManifest = `${manifest}.${randomUUID()}.tmp`;
  await fs.writeFile(temporaryManifest, JSON.stringify(image));
  await fs.rename(temporaryManifest, manifest);
  return image;
}
