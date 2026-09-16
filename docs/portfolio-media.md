# Portfolio media

The homepage and `/portfolio` use every supported file directly inside `public/portfolio`, with no curated filename limit. Current library: 70 images and two videos. Existing originals, including separate copies, are preserved.

- Images: JPG/JPEG, PNG, WebP, AVIF, GIF, SVG.
- Videos: MP4, MOV, M4V, WebM.
- Extensions are case-insensitive; hidden files and directories are excluded.
- Add originals to this folder and refresh during development. Deploy added files with the next build.
- Descriptions and subject categories live in `lib/portfolio.ts`. New files without descriptions still appear under More work; videos appear under Video & motion.
- Both galleries use lazy image loading. Videos show a lightweight poster and only create a player when opened; closing it stops playback.

`npm run dev` and `npm run build` prepare compatible H.264 MP4 copies and posters in the ignored `public/generated/portfolio-video` folder. Originals are never modified. Content-versioned output is reused until a source changes. New videos encountered while running are prepared on demand.

Video preparation uses the platform-specific `ffmpeg-static` dependency. Install dependencies normally on the target build platform. Generated files must be included with the built site's public assets.

Validation: all 72 entries checked against server-rendered homepage and portfolio output; both MP4 files support HTTP byte ranges; browser decoding checked for both videos, first video playback verified, player teardown verified. Production build, type checking, lint and six tests pass.
