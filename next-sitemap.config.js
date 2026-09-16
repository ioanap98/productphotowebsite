/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.epitomecreatives.com",
  generateRobotsTxt: true,
  // Build time is not the date the content changed.
  autoLastmod: false,
  transform: async (_config, path) =>
    ["/", "/services", "/portfolio", "/privacy"].includes(path) ? { loc: path } : null,
  additionalPaths: async (config) => {
    const { listPortfolioMediaFiles, portfolioMediaKind } = await import("./lib/portfolio-media-files.mjs");
    const files = await listPortfolioMediaFiles();
    const images = files.filter(file => portfolioMediaKind(file) === "image")
      .map(file => ({ loc: new URL(`/portfolio/${encodeURIComponent(file)}`, config.siteUrl) }));
    return [
      { loc: "/" },
      { loc: "/services" },
      { loc: "/portfolio", images },
    ];
  },
  exclude: ["/admin", "/admin/*", "/login", "/api/*", "/products"],
  robotsTxtOptions: {
    policies: [
      // Allow crawling login/admin pages so crawlers can observe their noindex tags.
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ],
  },
};
