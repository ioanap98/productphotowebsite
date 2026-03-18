// components/ui/hero.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  webImages: string[];
  mobileImages: string[];
}

export default function HeroSection({ webImages, mobileImages }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const images = isMobile ? mobileImages : webImages;

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate every 2 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        <Image
          src={images[current] || '/placeholder.svg'}
          alt={`Slide ${current + 1}`}
          fill
          className="object-cover"
          priority={true}
          loading="eager"
          sizes="100vw"
          quality={85}
        />
      </div>

      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* Centered text & button */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center text-white">
          <h1 className="text-4xl leading-[1.1] tracking-wide drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block font-medium text-white/80">CLARITY.</span>
            <span className="block font-medium text-white/80">CONSISTENCY.</span>
            <span className="block font-bold text-white">CONVERSION.</span>
          </h1>
          <Button
            size="lg"
            className="brand-gradient-button mt-8 border-0 px-8 py-6 text-sm font-semibold md:px-10 md:text-base"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Book a Product Shoot
          </Button>
        </div>
      </div>

    </section>
  );
}
