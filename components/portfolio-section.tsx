import { getPortfolioMedia } from "@/lib/portfolio";
import PortfolioGallery from "./portfolio-gallery";

export default async function PortfolioGrid() {
  const images = await getPortfolioMedia();
  return (
    <section id="portfolio" className="section-space">
      <div className="site-wrap">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-[#66675f]">01 / Portfolio</p>
            <h2 className="section-title">
              A product.
              <br />A point of view.
            </h2>
          </div>
          <p className="copy max-w-sm">
            Colour, texture and considered detail. Explore the full collection
            of photography and films for beauty, wellness and everyday rituals.
          </p>
        </div>
        <PortfolioGallery
          images={images}
          headingLevel="h3"
          eagerImages={false}
        />
      </div>
    </section>
  );
}
