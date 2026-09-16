import Image from "next/image";
import Link from "next/link";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import StructuredData from "@/components/structured-data";
import { breadcrumbs, organization, pageMetadata, pageSchema, siteUrl } from "@/lib/seo";

export const metadata = pageMetadata(
  "Product Photography & Video Services UK",
  "Product photography, short-form video, stop-motion and creative campaigns for beauty, skincare and wellness brands. Plan your shoot with Epitome Creatives.",
  "/services",
);

const services = [
  {
    id: "product-photography",
    title: "Product photography",
    description: "Still imagery for product pages, websites, launches and campaigns. The visual direction can range from a clean product portrait to a styled scene that brings out your brand’s colour and character.",
    detail: "For beauty and skincare, texture and detail help show the product itself: a reflective bottle, a cream’s consistency or the finish of its packaging. Wellness and lifestyle photography can bring together hero images, close-ups and product arrangements for a coherent collection.",
    deliverables: "Hero images, e-commerce photography, macro details and styled product scenes.",
    image: "/portfolio/0A.png",
    alt: "Cupio cuticle oil and pipette on a blush pink product photography set",
  },
  {
    id: "short-form-video",
    title: "Short-form product video",
    description: "Movement reveals the details that a photograph cannot. Product-in-use footage, texture and short visual stories give your audience a closer look at what you make.",
    detail: "Create content for Reels, TikTok and paid social, with the intended platform and format agreed in the brief. Planning the stills and video together helps keep your website, launch and social content visually consistent.",
    deliverables: "Vertical product video, product-in-use footage and social content.",
  },
  {
    id: "stop-motion",
    title: "Stop-motion & product animation",
    description: "Carefully staged movement turns products, packaging and props into playful short sequences. Stop-motion brings a different rhythm to a social feed or product launch.",
    detail: "The concept starts with the product and the movement that suits it. The portfolio includes beauty and supplement animations alongside product films, so you can explore how motion could fit your next brief.",
    deliverables: "Product animations, short social loops and launch content.",
  },
  {
    id: "creative-campaigns",
    title: "Creative campaigns",
    description: "A connected collection of photography and video built around one visual direction. A campaign can combine product portraits, lifestyle scenes, close-ups and motion to tell a consistent story.",
    detail: "Start with the channels you need to support and the products you want to feature. The proposal sets out the creative approach, deliverables, timeline and pricing around that scope.",
    deliverables: "Creative direction, lifestyle imagery and coordinated photo and video content.",
  },
];
const questions = [
  ["What should I include in my enquiry?", "Share your product or website, the content you need, where you plan to use it and any launch date. A moodboard or visual reference is helpful if you have one. The enquiry form also lets you add a budget and timeline."],
  ["How much does a product shoot cost?", "Pricing is tailored to the project. The number of products, creative approach, stills or video requirements and final deliverables shape the proposal. Send a brief to discuss the scope and receive pricing for your shoot."],
  ["How long does delivery take?", "Typical delivery is 1–2 weeks, depending on the agreed scope. Share your deadline when you enquire so the schedule can be discussed before the project starts."],
  ["Can a project include both photography and video?", "Yes. Still images, short-form video and stop-motion can be planned as a coordinated collection. The proposal confirms the formats and deliverables for your project."],
  ["How are the finished images delivered?", "Final imagery is delivered through an online gallery for the agreed channels. Discuss the formats and intended usage as part of your brief so the deliverables suit your website, campaign or social content."],
];

export default function ServicesPage() {
  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@graph": [
          pageSchema("/services", "Product Photography & Video Services UK"),
          breadcrumbs("/services", "Services"),
          ...services.map(service => ({
            "@type": "Service",
            "@id": `${siteUrl}/services#${service.id}`,
            url: `${siteUrl}/services#${service.id}`,
            name: service.title,
            description: service.description,
            serviceType: service.title,
            provider: { "@id": organization["@id"], name: organization.name, url: siteUrl },
            areaServed: { "@type": "Country", name: "United Kingdom" },
          })),
        ],
      }} />
      <Header />
      <main id="main-content">
        <section className="site-wrap section-space">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-[#66675f]">
            <Link href="/" className="underline">Home</Link> / Services
          </nav>
          <p className="eyebrow mb-5">Home-based UK studio</p>
          <h1 className="section-title max-w-4xl">Product photography<br />& video services.</h1>
          <p className="copy mt-7 max-w-2xl">Photography, short-form video and stop-motion for beauty, skincare, wellness and lifestyle brands. From a single product to a complete campaign, Epitome Creatives creates content around your brand and the places it needs to be seen.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/#contact" className="studio-button">Discuss your shoot <span aria-hidden="true">↗</span></Link>
            <Link href="/portfolio" className="text-link">Explore the photography & video portfolio</Link>
          </div>
        </section>
        <div className="site-wrap">
          {services.map((service, index) => (
            <section key={service.id} id={service.id} className="grid gap-8 border-t border-[#d8d7d0] py-14 md:grid-cols-2 md:gap-16">
              <div>
                <p className="eyebrow mb-4 text-[#66675f]">0{index + 1}</p>
                <h2 className="text-3xl tracking-[-.035em] sm:text-4xl">{service.title}</h2>
                {service.image && <Image src={service.image} alt={service.alt!} width={640} height={480} sizes="(max-width: 767px) 100vw, 50vw" className="mt-8 aspect-[4/3] w-full object-cover" />}
              </div>
              <div className="copy space-y-5">
                <p>{service.description}</p>
                <p>{service.detail}</p>
                <p><strong className="font-medium text-[#242522]">What we create:</strong> {service.deliverables}</p>
                <Link href="/portfolio" className="text-link">See examples in the portfolio <span aria-hidden="true">↗</span></Link>
              </div>
            </section>
          ))}
        </div>
        <section className="section-space bg-[#ebeae3]">
          <div className="site-wrap grid gap-10 md:grid-cols-2 md:gap-16">
            <div><p className="eyebrow mb-4">Planning your shoot</p><h2 className="section-title">A few useful<br />starting points.</h2></div>
            <div>{questions.map(([question, answer]) => (
              <details key={question} className="border-b border-[#c9c9bf] py-5 first:pt-0">
                <summary className="cursor-pointer text-lg tracking-[-.02em]">{question}</summary>
                <p className="copy mt-4">{answer}</p>
              </details>
            ))}</div>
          </div>
        </section>
        <section className="site-wrap section-space">
          <h2 className="section-title">Let’s start with your product.</h2>
          <p className="copy mt-5 max-w-xl">Tell us about your brand, your goals and what you have in mind. We’ll discuss a visual direction and a scope that fits your project.</p>
          <Link href="/#contact" className="studio-button mt-7">Enquire about a shoot <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
