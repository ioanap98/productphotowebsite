# Epitome Creatives — website audit and implementation plan

## Existing strengths

- Next.js 16 App Router, React 19, Tailwind 4, Inter, responsive image tooling and reusable components.
- Forty portfolio photographs spanning skincare, beauty, wellness and supplements; separate mobile and desktop hero libraries.
- Working Web3Forms enquiry integration, Vercel Analytics, existing admin upload/delete workflows.
- Prepared responsive hero WebPs with embedded previews and server-rendered image discovery.

## Findings

- **Conversion:** broad headline, services before portfolio, forty images before the enquiry, duplicated approach copy, weak enquiry hierarchy. No verified public pricing or testimonials.
- **Design:** many pink/purple/blue gradients, rotating icons, repeated centred sections and shadowed cards compete with the photography. Preserve the identifiable wordmark; simplify the surrounding design.
- **Mobile/accessibility:** fixed header anchors lack offsets; mobile menu has no accessible name/state and stays open after navigation; placeholder-only form labels; no reduced-motion accommodation for the carousel. Navigation anchors fail on other routes.
- **Performance:** most presentational components require client JavaScript and scroll animations; gallery waits for a client API request; studio video autoplays below the fold. Preserve previous hero optimisation.
- **SEO:** small-brand positioning dominates metadata; logo URL casing is wrong; no page canonicals; public portfolio reads the wrong directory; sitemap can include admin/login; filename-based image descriptions.
- **Trust:** displayed 67% / 3x / 40% statistics have no supporting evidence in the repository. Remove them. Existing featured project text includes missing image paths; use only verified assets and avoid implying a paid client relationship.
- **Integrations:** preserve Web3Forms, analytics, contact email, Instagram, original images and administration. Existing admin auth warrants a separate security review; this change does not redesign authentication.

## Implementation order and files

1. Editorial design tokens and accessible navigation: `app/globals.css`, `components/navbar.tsx`, `components/footer.tsx`.
2. Clear hero with restrained rotation and existing responsive images: `components/ui/hero.tsx`.
3. Curated homepage and full filterable portfolio using verified image descriptions: `lib/portfolio.ts`, `components/portfolio-section.tsx`, gallery component, `app/portfolio/page.tsx`.
4. Concise services, verified photographic series, studio story and process: existing services, featured-work, about and testimonials components, new process component; compose in `app/page.tsx`.
5. Accessible enquiry form preserving the destination and adding optional qualification fields: `components/contact-section.tsx`.
6. Repair public routes, metadata, logo path, structured data and sitemap; no duplicate paid landing page, since the homepage now provides the ad-to-enquiry journey.
7. Restore runnable ESLint configuration; production build, type checks, public route checks and desktop/mobile browser checks. Verify form validation and mocked delivery without sending test enquiries to the business.

## Scope notes

The deployed URL could not be retrieved through the web lookup tool; the audit uses the full local route/component structure, existing content and local browser rendering. No new clients, outcomes, reviews, prices or commercial usage promises will be fabricated.

## Validation completed

- `npm run lint`: passes with no warnings or errors.
- `npm test`: four enquiry-transport tests pass, covering payload/destination, success, HTTP/provider errors, offline/invalid responses and the honeypot. Tests use mocked responses; no test enquiry was sent to the business.
- `next typegen` and `tsc --noEmit`: pass. Final `npm run build`: passes, including TypeScript and sitemap generation.
- Ran the production server separately and checked homepage, portfolio, privacy and login: HTTP 200, one H1, working internal anchors and appropriate metadata. Verified canonical links, valid structured data and logo asset.
- `/products` redirects to `/portfolio`; admin and image-manager routes still redirect unauthenticated visitors to login. Administration upload/delete operations were preserved, not exercised against the live library.
- Image-list endpoints return 5 desktop, 7 mobile and 40 portfolio images, excluding hidden files. Hero retains embedded previews and prepared responsive assets.
- Sitemap explicitly includes homepage and portfolio (dynamic routes otherwise omitted by the generator), plus privacy; excludes admin, login and legacy products.
- Browser checks: mobile menu opens/closes and closes after navigation; cross-page enquiry link works; form required-field validation focuses the first invalid field; optional details expand; gallery category filters, next-image control, Escape and focus restoration work.
- No horizontal overflow found on homepage/enquiry and portfolio at widths 320, 375, 768 and 1440. Privacy and login checked at 320. Compact hero verified in production at 320 × 568: primary CTA fits in the first viewport.
- Desktop, mobile hero, services, enquiry and portfolio visually inspected. No browser console errors recorded in the test session.

## Practical limits

Live email delivery was not triggered; provider delivery/account status is not certified by the mocked integration tests. No field Core Web Vitals or conversion uplift is claimed: those require deployed traffic measurements. The existing Web3Forms and Vercel Analytics integrations remain in place. The homepage serves the ad-to-enquiry journey, so no redundant paid-traffic landing page was added.
