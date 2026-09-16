# SEO implementation and launch checks

## Implemented

- Unique titles, descriptions, canonicals and Open Graph/Twitter metadata for home, services, portfolio and privacy. A compressed 1200 × 630 social preview uses an existing photograph.
- A server-rendered `/services` page explains the four real services and shoot-planning questions, with links from the homepage, navigation and footer.
- Descriptive primary headings and existing image alt text; all portfolio media remains in server-rendered gallery markup.
- Organization, WebSite, WebPage, CollectionPage, Service and breadcrumb JSON-LD. No invented reviews, ratings, prices, street address or London location. Home-based studio wording follows the owner's confirmation; the existing UK positioning is retained.
- Image sitemap includes all 57 current portfolio photographs. Image paths are URL-encoded; hidden files and videos are excluded from image entries. It regenerates on build, so rebuild/redeploy after media changes.
- Sitemap includes only home, services, portfolio and privacy. No fake modification dates refreshed on every build.
- Public pages allow indexing and large image previews. Admin, login and API routes have now been removed and return 404.
- Existing responsive pre-generated hero WebPs, high-priority first-image preloads, gallery lazy loading and video posters are retained.
- Optional Google verification meta tag reads `GOOGLE_SITE_VERIFICATION`. Only set this to the actual Search Console HTML verification token; no placeholder token is output.

## Validation

`npm run lint`, `npm test`, and `npm run build` pass. With a production server running, `node scripts/check-seo.mjs http://localhost:3100` checks public HTTP status, unique branded titles/descriptions, canonicals, one H1 per page, indexability, parseable JSON-LD, image sitemap coverage, removed admin/API routes, the legacy 308 redirect, real 404 responses and the social preview asset.

Services page inspected at desktop and 375 px mobile widths. Mobile homepage inspected: no horizontal overflow, loaded hero, usable enquiry link. Native FAQ disclosures work. These are local checks, not a measured field Core Web Vitals score or certification by Google's Rich Results Test.

## Critical live issue observed on 16 September 2026

Two direct HTTPS requests to `https://www.epitomecreatives.com/` returned HTTP 500 with Next.js error HTML. `/portfolio` and `/robots.txt` returned 200. HTTP redirects to HTTPS (308); the apex domain redirects to www (307).

The public deployment has older markup and does not contain these local updates. Inspect hosting runtime logs for the homepage error and deploy the validated version; then verify that the live homepage returns 200. The exact production exception cannot be identified from the public error page. No hosting access, production deployment or server-log inspection was performed in this task.

## After deployment

1. Confirm the homepage, services, portfolio, robots and sitemap URLs return 200. Confirm all generated media is deployed and usable without trying to write to a read-only hosting filesystem. Configure a permanent apex-to-www redirect in hosting if www remains canonical (currently 307).
2. Verify domain ownership in Google Search Console, using DNS verification or the supported HTML verification environment variable. Submit `https://www.epitomecreatives.com/sitemap.xml`.
3. Use URL Inspection to inspect and request indexing of the homepage, services and portfolio. Validate supported structured data with Google's Rich Results Test.
4. Monitor Page indexing and Core Web Vitals in Search Console. Measure the deployed mobile experience with PageSpeed Insights; localhost timings are not representative of customers' networks or Google's field data.
5. Develop useful project case studies with actual briefs, creative decisions, photographs and approved client feedback. Add outcomes only when supported by evidence. Grow relevant links through real collaborations and published work.
6. Do not publish the home address for SEO. Do not create city pages or local-business profiles for locations the studio does not serve or qualify for.

Rankings, indexing and rich-result appearances are decided by Google. This implementation improves crawlability and content clarity; it does not promise a position or guarantee immediate indexing.

References:
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps

## Deployment architecture update

All public routes are now prerendered, and media manifests are generated before build. Runtime pages do not scan folders or invoke Sharp/FFmpeg. The previous admin/upload APIs have been removed. Rebuild and redeploy after changing media. The earlier live HTTP 500 observation remains historical until the new deployment is verified.
