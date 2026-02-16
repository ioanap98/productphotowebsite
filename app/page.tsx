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
  const [images, setImages] = useState<string[]>([]);
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

  

  // 1️⃣ Fetch the list of filenames from your API
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/images');
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data: string[] = await res.json();
        if (Array.isArray(data)) {
          // 2️⃣ Build public URLs for each file
          setImages(data.map((f) => `/uploads/${f}`));
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

  if (images.length === 0) {
    return <p className="p-6 text-center">No images found.</p>;
  }



  return (
    <>
      <Header />
      <HeroSection images={images} />
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
