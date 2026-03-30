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
      <div className="relative z-10 flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center text-white pt-20 sm:pt-24 md:pt-28 lg:pt-32">
          <h1 className="max-w-5xl text-3xl font-bold leading-tight tracking-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block">
              High-Converting Product Photography &amp; Video
            </span>
          </h1>

          <Button
            size="lg"
            className="brand-gradient-button mt-6 sm:mt-8 border-0 px-6 py-5 text-sm font-semibold sm:px-8 md:px-10 md:py-6 md:text-base"
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
