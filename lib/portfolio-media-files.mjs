import fs from "node:fs/promises";
import path from "node:path";

const images = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
  ".avif",
]);
const videos = new Set([".mp4", ".mov", ".m4v", ".webm"]);

/** @param {string} filename */
export function portfolioMediaKind(filename) {
  if (filename.startsWith(".")) return null;
  const extension = path.extname(filename).toLowerCase();
  if (images.has(extension)) return "image";
  if (videos.has(extension)) return "video";
  return null;
}

/** @param {string} directory */
export async function listPortfolioMediaFiles(directory = "public/portfolio") {
  try {
    const entries = await fs.readdir(path.resolve(directory), {
      withFileTypes: true,
    });
    return entries
      .filter((entry) => entry.isFile() && portfolioMediaKind(entry.name))
      .map((entry) => entry.name)
      .sort(
        (a, b) =>
          a.localeCompare(b, "en", { numeric: true }) ||
          a.localeCompare(b, "en"),
      );
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}
