# Portfolio media

The homepage and `/portfolio` include every supported file directly inside `public/portfolio`. Originals are preserved.

- Images: JPG/JPEG, PNG, WebP, AVIF, GIF and SVG.
- Videos: MP4, MOV, M4V and WebM.
- Hidden files and directories are excluded; extensions are case-insensitive.
- Add originals to the folder, then restart `npm run dev` or rebuild and redeploy. Media is discovered before startup/build, not while serving a request.
- Descriptions and categories live in `lib/portfolio.ts`. Uncatalogued images still appear under More work; videos appear under Video & motion.
- Galleries lazy-load images. Videos use poster thumbnails and load the player when opened.

`npm run dev` and `npm run build` prepare responsive hero images, H.264 portfolio videos and posters, plus JSON manifests in `.generated/`. All generated assets and manifests are ignored by Git and regenerated before compilation. Use the npm scripts rather than invoking `next build` directly.

FFmpeg is a development/build dependency only. Runtime page code imports small JSON manifests, with no imports of the image/video preparation helpers or filesystem scanning. Every public page is prerendered. Generated files in `public/generated` must be deployed as static assets.

The admin, login, upload and image-management API routes have been removed. The enquiry form continues to submit directly to Web3Forms.
