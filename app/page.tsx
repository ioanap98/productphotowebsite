import HeroSection from '@/components/ui/hero';
import PortfolioGrid from '@/components/portfolio-section';
import ServicesSection from '@/components/services-section';
import AboutSection from '@/components/about-section';
import WhyChooseUsSection from '@/components/testimonials-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import Header from '@/components/navbar';
import { listImageFiles } from '@/lib/image-files';
import { prepareHeroImage } from '@/lib/hero-assets.mjs';

// Read uploads on each request so admin changes appear immediately.
export const dynamic = 'force-dynamic';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Epitome Creatives",
  "image": "https://www.epitomecreatives.com/logo.png",
  "url": "https://www.epitomecreatives.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "London",
    "addressCountry": "GB"
  },
  "description": "Epitome Creatives is a UK-based product photography studio specialising in clean, minimalist, high-converting visuals for e-commerce brands. We work with skincare, lifestyle, accessories, and wellness brands to deliver standout digital content.",
  "priceRange": "££",
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom"
  },
  "sameAs": [
    "https://www.instagram.com/epitome.creatives"
  ]
};

export default async function HomePage() {
  const [webFiles, mobileFiles] = await Promise.all([
    listImageFiles('public/uploads/web'),
    listImageFiles('public/uploads/mobile'),
  ]);
  const [webImages, mobileImages] = await Promise.all([
    Promise.all(webFiles.map((file) => prepareHeroImage('web', file))),
    Promise.all(mobileFiles.map((file) => prepareHeroImage('mobile', file))),
  ]);
  const firstDesktop = webImages[0] || mobileImages[0];
  const firstMobile = mobileImages[0] || webImages[0];

  return (
    <>
      {firstMobile && <link rel="preload" as="image" href={firstMobile.src} imageSrcSet={firstMobile.srcSet || undefined} imageSizes="100vw" media="(max-width: 767px)" fetchPriority="high" />}
      {firstDesktop && <link rel="preload" as="image" href={firstDesktop.src} imageSrcSet={firstDesktop.srcSet || undefined} imageSizes="100vw" media="(min-width: 768px)" fetchPriority="high" />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Header />
      <HeroSection webImages={webImages} mobileImages={mobileImages} />
      <ServicesSection />
      <PortfolioGrid />
      <AboutSection />
      <WhyChooseUsSection />
      <ContactSection />
      <Footer />

    </>
  );
}
