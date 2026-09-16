import Link from "next/link";
const services = [
  [
    "Product photography",
    "Considered light, colour and composition for websites, product launches and campaigns. From clean hero shots to macro detail and texture.",
    "Hero imagery / E-commerce / Macro & detail",
  ],
  [
    "Short-form video",
    "Product stories made for Reels, TikTok and paid social. Show the texture, movement and moments a still image cannot.",
    "Vertical video / Product-in-use / Social content",
  ],
  [
    "Stop-motion",
    "Playful, carefully crafted product animations that bring character to your social feed and campaign creative.",
    "Product animation / Social loops / Launch content",
  ],
  [
    "Creative campaigns",
    "One visual direction, a complete collection of content. Photography, lifestyle scenes and motion designed to work together.",
    "Creative direction / Lifestyle / Photo & video",
  ],
];
export default function ServicesSection() {
  return (
    <section id="services" className="section-space bg-[#ebeae3]">
      <div className="site-wrap grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
        <div>
          <p className="eyebrow mb-4 text-[#66675f]">02 / What we create</p>
          <h2 className="section-title">
            From first impression
            <br />
            to every detail.
          </h2>
          <p className="copy mt-6 max-w-sm">
            A single product or a complete collection. Content shaped around
            your brand, your launch and the places it needs to be seen.
          </p>
          <Link href="/services" className="text-link mt-6">
            Explore photography & video services <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div>
          {services.map(([title, description, detail], index) => (
            <article
              key={title}
              className="grid grid-cols-[28px_1fr] gap-4 border-t border-[#c9c9bf] py-7 first:pt-0 first:border-t-0"
            >
              <span className="pt-1 text-xs text-[#66675f]">0{index + 1}</span>
              <div>
                <h3 className="text-xl tracking-[-.025em] sm:text-2xl">
                  {title}
                </h3>
                <p className="copy mt-3">{description}</p>
                <p className="mt-4 text-[10px] uppercase tracking-[.12em] text-[#66675f]">
                  {detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
