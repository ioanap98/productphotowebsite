// components/ui/hero.tsx
'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import type { HeroImage } from '@/lib/hero-assets.mjs';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  webImages: HeroImage[];
  mobileImages: HeroImage[];
}

const MOBILE_QUERY = '(max-width: 767px)';

function subscribeToViewport(callback: () => void) {
  const media = window.matchMedia(MOBILE_QUERY);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export default function HeroSection(props: HeroSectionProps) {
  const isMobile = useSyncExternalStore(
    subscribeToViewport,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );

  return <HeroSlideshow key={isMobile ? 'mobile' : 'desktop'} {...props} isMobile={isMobile} />;
}

function HeroSlideshow({ webImages, mobileImages, isMobile }: HeroSectionProps & { isMobile: boolean }) {
  const [current, setCurrent] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(() => new Set());
  const desktop = webImages.length ? webImages : mobileImages;
  const mobile = mobileImages.length ? mobileImages : webImages;
  const slideCount = isMobile ? mobile.length : desktop.length;
  const next = (current + 1) % (slideCount || 1);
  const nextReady = loadedSlides.has(next);

  // Keep the current photo visible until the upcoming slide has loaded.
  useEffect(() => {
    if (slideCount <= 1 || !nextReady) return;
    const timer = window.setTimeout(() => setCurrent(next), 2000);
    return () => window.clearTimeout(timer);
  }, [current, next, nextReady, slideCount]);

  const visibleSlides = slideCount === 0 ? [] : [current];
  // Start only one slide ahead, after the visible image has finished loading.
  if (slideCount > 1 && loadedSlides.has(current)) visibleSlides.push(next);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {desktop[0]?.preview && (
          <picture>
            <source media="(max-width: 767px)" srcSet={mobile[0]?.preview || desktop[0].preview} />
            <img src={desktop[0].preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </picture>
        )}
        {visibleSlides.map((index) => {
          const desktopImage = desktop[index % desktop.length];
          const mobileImage = mobile[index % mobile.length];

          return (
            <picture key={index}>
              <source media="(max-width: 767px)" srcSet={mobileImage.srcSet || mobileImage.src} sizes="100vw" />
              {/* These files are optimized before serving, avoiding cold image processing. */}
              <img
                src={desktopImage.src}
                srcSet={desktopImage.srcSet || undefined}
                sizes="100vw"
                alt={`Product photography — slide ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-cover ${index === current ? 'opacity-100' : 'opacity-0'}`}
                aria-hidden={index !== current}
                loading="eager"
                fetchPriority={index === current ? 'high' : 'low'}
                ref={(image) => {
                  // Cached images may finish before React hydrates the page.
                  if (image?.complete && image.naturalWidth > 0) {
                    setLoadedSlides((previous) => previous.has(index) ? previous : new Set(previous).add(index));
                  }
                }}
                onLoad={() => setLoadedSlides((previous) => {
                  if (previous.has(index)) return previous;
                  return new Set(previous).add(index);
                })}
              />
            </picture>
          );
        })}
      </div>

      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      {/* Centered text & button */}
        <div className="relative z-10 flex min-h-screen items-end sm:items-center justify-center px-4 pb-16 sm:pb-0 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center text-white pt-20 sm:pt-24 md:pt-28 lg:pt-32">
            
            <h1 className="max-w-5xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
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
