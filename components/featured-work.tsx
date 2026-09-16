import Image from "next/image";
import { getPortfolioMedia } from "@/lib/portfolio";

export default async function FeaturedWork() {
  const all = await getPortfolioMedia();
  const images = ["06.png", "20.png", "3.png"].flatMap(
    (filename) => all.find((image) => image.filename === filename) || [],
  );
  if (!images.length) return null;
  return (
    <section className="section-space bg-[#242522] text-[#f7f5f1]">
      <div className="site-wrap">
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-4 text-[#c6c7ba]">
              03 / A closer look · Q+A skincare
            </p>
            <h2 className="section-title">
              One story.
              <br />
              More than one frame.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#d1d1c8] md:justify-self-end">
            A bold yellow palette connects clean product compositions, an
            in-hand moment and playful arrangements. A look at how a visual
            direction can carry across a collection of images.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {images.map((image, index) => (
            <figure key={image.filename}>
              <div className="relative aspect-square overflow-hidden bg-[#e3c039]">
                <Image
                  src={`/portfolio/${image.filename}`}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 flex justify-between text-xs text-[#d1d1c8]">
                <span>
                  {
                    [
                      "The line-up",
                      "The human touch",
                      "The creative composition",
                    ][index]
                  }
                </span>
                <span>0{index + 1}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <a href="#contact" className="text-link mt-10">
          Create a visual story for your brand{" "}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
