import type { Metadata } from "next";
import StructuredData from "@/components/structured-data";
import { breadcrumbs, pageMetadata, pageSchema } from "@/lib/seo";
import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import PortfolioGallery from "@/components/portfolio-gallery";
import { getPortfolioMedia } from "@/lib/portfolio";

export const dynamic = "force-dynamic";
export const metadata: Metadata = pageMetadata(
  "Product Photography & Video Portfolio",
  "Explore beauty, skincare, wellness and lifestyle product photography, stop-motion and video by Epitome Creatives, an independent UK studio.",
  "/portfolio",
);
export default async function PortfolioPage() {
  const images = await getPortfolioMedia();
  return (
    <>
      <StructuredData data={{ "@context": "https://schema.org", "@graph": [pageSchema("/portfolio", "Product Photography & Video Portfolio", "CollectionPage"), breadcrumbs("/portfolio", "Portfolio")] }} />
      <Header />
      <main id="main-content">
        <section className="site-wrap section-space">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-[#66675f]"><Link href="/" className="underline">Home</Link> / Portfolio</nav>
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h1 className="section-title">
              Product photography
              <br />
              & video portfolio.
            </h1>
            <p className="copy max-w-sm">
              Beauty, skincare, wellness and lifestyle. Explore the light,
              texture and detail behind the work.
            </p>
          </div>
          <PortfolioGallery images={images} />
        </section>
        <section className="bg-[#ebeae3] py-16">
          <div className="site-wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <h2 className="section-title">Your product, next.</h2>
            <Link className="studio-button" href="/#contact">
              Enquire About a Shoot <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
