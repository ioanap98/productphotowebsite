import fs from "node:fs/promises";
import path from "node:path";
import { createHash, randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import ffmpeg from "ffmpeg-static";

const run = promisify(execFile);
const pending = new Map();

/**
 * Prepare an H.264 MP4 and first-frame poster without changing the original.
 * @param {string} filename
 * @returns {Promise<{src: string, poster: string}>}
 */
export async function preparePortfolioVideo(filename) {
  const source = path.join(process.cwd(), "public/portfolio", filename);
  const stat = await fs.stat(source);
  const key = createHash("sha256")
    .update(`v1:${filename}:${stat.size}:${stat.mtimeMs}`)
    .digest("hex")
    .slice(0, 24);
  if (pending.has(key)) return pending.get(key);
  const output = path.join(process.cwd(), "public/generated/portfolio-video");
  const video = path.join(output, `${key}.mp4`);
  const poster = path.join(output, `${key}.jpg`);
  const result = {
    src: `/generated/portfolio-video/${key}.mp4`,
    poster: `/generated/portfolio-video/${key}.jpg`,
  };
  const work = (async () => {
    try {
      await Promise.all([fs.access(video), fs.access(poster)]);
      return result;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (!ffmpeg) throw new Error("FFmpeg is unavailable on this platform.");
    await fs.mkdir(output, { recursive: true });
    const token = randomUUID();
    const temporaryVideo = path.join(output, `${key}-${token}.mp4`);
    const temporaryPoster = path.join(output, `${key}-${token}.jpg`);
    try {
      await run(
        ffmpeg,
        [
          "-y",
          "-i",
          source,
          "-map",
          "0:v:0",
          "-map",
          "0:a?",
          "-vf",
          "scale=w='min(1920,iw)':h='min(1920,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2",
          "-c:v",
          "libx264",
          "-preset",
          "fast",
          "-crf",
          "20",
          "-pix_fmt",
          "yuv420p",
          "-c:a",
          "aac",
          "-b:a",
          "128k",
          "-movflags",
          "+faststart",
          temporaryVideo,
        ],
        { maxBuffer: 4 * 1024 * 1024 },
      );
      await run(
        ffmpeg,
        [
          "-y",
          "-i",
          temporaryVideo,
          "-frames:v",
          "1",
          "-vf",
          "scale=640:-2",
          "-q:v",
          "3",
          temporaryPoster,
        ],
        { maxBuffer: 4 * 1024 * 1024 },
      );
      await fs.rename(temporaryVideo, video);
      await fs.rename(temporaryPoster, poster);
      return result;
    } finally {
      await Promise.all(
        [temporaryVideo, temporaryPoster].map((file) =>
          fs.rm(file, { force: true }),
        ),
      );
    }
  })();
  pending.set(key, work);
  try {
    return await work;
  } finally {
    pending.delete(key);
  }
}
