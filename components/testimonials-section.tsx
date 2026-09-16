const benefits = [
  [
    "A considered direction",
    "A clear brief and shared visual references keep every photograph aligned with your brand.",
  ],
  [
    "Made for your channels",
    "Deliverables are planned around your website, e-commerce, social media and campaign needs.",
  ],
  [
    "A clear collaboration",
    "A tailored proposal sets out the scope, timeline and pricing before the shoot begins.",
  ],
];
// These are studio principles, not unverified testimonials or outcome statistics.
export default function WhyChooseUsSection() {
  return (
    <section aria-label="The Epitome approach" className="pb-16 md:pb-24">
      <div className="site-wrap grid gap-8 border-t border-[#d8d7d0] pt-10 md:grid-cols-3 md:gap-12">
        {benefits.map(([title, description]) => (
          <div key={title}>
            <h2 className="text-lg tracking-[-.025em]">{title}</h2>
            <p className="copy mt-3 text-sm">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
