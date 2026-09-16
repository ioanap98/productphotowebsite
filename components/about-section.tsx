import { getImageProps } from "next/image";
export default function AboutSection() {
  const { props: poster } = getImageProps({
    src: "/portfolio/0A.png",
    alt: "",
    width: 320,
    height: 240,
  });
  return (
    <section id="about" className="section-space">
      <div className="site-wrap grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative bg-[#e9e6e0]">
          <video
            controls
            playsInline
            preload="none"
            poster={poster.src}
            aria-label="Behind the scenes at Epitome Creatives"
            className="aspect-[4/3] w-full object-cover"
          >
            <source src="/IMG_4867.mp4" type="video/mp4" />
            <p>
              <a href="/IMG_4867.mp4">Watch the studio video</a>
            </p>
          </video>
          <p className="px-4 py-3 text-xs text-[#66675f]">
            Behind the scenes · A closer look at the studio
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4 text-[#66675f]">04 / The studio</p>
          <h2 className="section-title">
            An eye for detail.
            <br />A feel for your brand.
          </h2>
          <p className="copy mt-6">
            Epitome Creatives is an independent, home-based UK studio creating product
            photography and content for beauty, wellness and lifestyle brands.
          </p>
          <p className="copy mt-4">
            Built on more than ten years of passion for photography and a
            background in engineering, the studio brings a precise, thoughtful
            approach to light, texture and composition.
          </p>
          <p className="copy mt-4">
            Every project starts with your product and a clear visual direction.
            The aim is a cohesive collection that feels unmistakably yours.
          </p>
          <a href="#contact" className="text-link mt-6">
            Let’s talk about your brand <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
