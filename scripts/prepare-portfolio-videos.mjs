import {
  listPortfolioMediaFiles,
  portfolioMediaKind,
} from "../lib/portfolio-media-files.mjs";
import { preparePortfolioVideo } from "../lib/portfolio-video.mjs";
const videos = (await listPortfolioMediaFiles()).filter(
  (file) => portfolioMediaKind(file) === "video",
);
for (const filename of videos) await preparePortfolioVideo(filename);
console.log(`Prepared ${videos.length} portfolio videos.`);
