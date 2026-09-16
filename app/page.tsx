import type { Metadata } from "next";
import StructuredData from "@/components/structured-data";
import { organization, pageMetadata, pageSchema, siteDescription, siteName, siteUrl } from "@/lib/seo";
import HeroSection from "@/components/ui/hero";
import PortfolioGrid from "@/components/portfolio-section";
import ServicesSection from "@/components/services-section";
import AboutSection from "@/components/about-section";
import WhyChooseUsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import FeaturedWork from "@/components/featured-work";
import ProcessSection from "@/components/process-section";
import Header from "@/components/navbar";
import { listImageFiles } from "@/lib/image-files";
import { prepareHeroImage } from "@/lib/hero-assets.mjs";

// Read uploads on each request so admin changes appear immediately.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...pageMetadata("Product Photography & Video UK", siteDescription, "/"),
  title: { absolute: "Product Photography & Video UK | Epitome Creatives" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      inLanguage: "en-GB",
      publisher: { "@id": organization["@id"] },
    },
    pageSchema("/", "Product Photography & Video UK"),
  ],
};

export default async function HomePage() {
  const [webFiles, mobileFiles] = await Promise.all([
    listImageFiles("public/uploads/web"),
    listImageFiles("public/uploads/mobile"),
  ]);
  const [webImages, mobileImages] = await Promise.all([
    Promise.all(webFiles.map((file) => prepareHeroImage("web", file))),
    Promise.all(mobileFiles.map((file) => prepareHeroImage("mobile", file))),
  ]);
  const firstDesktop = webImages[0] || mobileImages[0];
  const firstMobile = mobileImages[0] || webImages[0];

  return (
    <>
      {firstMobile && (
        <link
          rel="preload"
          as="image"
          href={firstMobile.src}
          imageSrcSet={firstMobile.srcSet || undefined}
          imageSizes="100vw"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
      )}
      {firstDesktop && (
        <link
          rel="preload"
          as="image"
          href={firstDesktop.src}
          imageSrcSet={firstDesktop.srcSet || undefined}
          imageSizes="100vw"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
      )}
      <StructuredData data={structuredData} />
      <Header />
      <main id="main-content">
        <HeroSection webImages={webImages} mobileImages={mobileImages} />
        <PortfolioGrid />
        <ServicesSection />
        <FeaturedWork />
        <AboutSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
