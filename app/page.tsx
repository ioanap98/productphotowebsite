'use client'

import { useState, useEffect } from 'react';
import HeroSection from '@/components/ui/hero';
// import TickerTape from '@/components/tickertape_animation';
import PortfolioGrid from '@/components/portfolio-section';
import ServicesSection from '@/components/services-section';
import AboutSection from '@/components/about-section';
import WhyChooseUsSection from '@/components/testimonials-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';
import FeaturedWork from '@/components/featured-work';
import Header from '@/components/navbar';


export default function HomePage() {
  const [webImages, setWebImages] = useState<string[]>([]);
  const [mobileImages, setMobileImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);


  
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
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
    });
    document.head.appendChild(script);
  }, []);

  

  // 1️⃣ Fetch web and mobile images from separate endpoints
  useEffect(() => {
    (async () => {
      try {
        const [webRes, mobileRes] = await Promise.all([
          fetch('/api/images/web'),
          fetch('/api/images/mobile')
        ]);

        if (!webRes.ok) throw new Error(`Web images status ${webRes.status}`);
        if (!mobileRes.ok) throw new Error(`Mobile images status ${mobileRes.status}`);

        const webData: string[] = await webRes.json();
        const mobileData: string[] = await mobileRes.json();

        if (Array.isArray(webData)) {
          const urls = webData.map((f) => `/uploads/web/${f}`);
          setWebImages(urls);
        }
        if (Array.isArray(mobileData)) {
          const urls = mobileData.map((f) => `/uploads/mobile/${f}`);
          setMobileImages(urls);
        }
      } catch (err) {
        console.error('Failed to load images', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Loading…</p>;
  }

  if (webImages.length === 0 && mobileImages.length === 0) {
    return <p className="p-6 text-center">No images found.</p>;
  }



  return (
    <>
      <Header />
      <HeroSection webImages={webImages} mobileImages={mobileImages} />
      {/* <TickerTape /> */}
      <ServicesSection />
      <PortfolioGrid />
      <FeaturedWork />
      <AboutSection />
      <WhyChooseUsSection />
      <ContactSection />
      <Footer />
      



    </>
  );
}
