import fs from "node:fs/promises";
import { listPortfolioMediaFiles, portfolioMediaKind } from "../lib/portfolio-media-files.mjs";
import { preparePortfolioVideo } from "../lib/portfolio-video.mjs";

const manifest = [];
for (const filename of await listPortfolioMediaFiles()) {
  const kind = portfolioMediaKind(filename);
  const asset = kind === "video"
    ? await preparePortfolioVideo(filename)
    : { src: `/portfolio/${encodeURIComponent(filename)}` };
  manifest.push({ filename, kind, ...asset });
}
await fs.mkdir(".generated", { recursive: true });
await fs.writeFile(".generated/portfolio.json", JSON.stringify(manifest));
console.log(`Prepared ${manifest.filter(item => item.kind === "video").length} portfolio videos and ${manifest.length} media entries.`);
