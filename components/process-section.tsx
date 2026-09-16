const steps = [
  [
    "Tell us about your product",
    "Share your brand, goals and the content you have in mind. A starting point is all you need.",
  ],
  [
    "Shape the creative direction",
    "Receive a tailored proposal with the visual approach, deliverables, timeline and pricing.",
  ],
  [
    "Create & refine",
    "The shoot brings the direction to life, followed by careful selection, editing and retouching.",
  ],
  [
    "Ready for your brand",
    "Receive your final imagery through an online gallery, ready for the agreed channels.",
  ],
];
export default function ProcessSection() {
  return (
    <section id="process" className="section-space bg-[#ebeae3]">
      <div className="site-wrap">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-[#66675f]">05 / How it works</p>
            <h2 className="section-title">
              From your brief
              <br />
              to your next campaign.
            </h2>
          </div>
          <p className="copy max-w-sm">
            A clear process, with room for creativity.
            <br />
            Typical delivery is 1–2 weeks, depending on the agreed scope.
          </p>
        </div>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, description], index) => (
            <li key={title} className="border-t border-[#c9c9bf] pt-5">
              <span className="eyebrow text-[#66675f]">0{index + 1}</span>
              <h3 className="mt-6 text-lg tracking-[-.025em]">{title}</h3>
              <p className="copy mt-3 text-sm">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
