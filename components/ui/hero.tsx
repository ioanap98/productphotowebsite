// components/ui/hero.tsx
"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import type { HeroImage } from "@/lib/hero-assets.mjs";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";

interface HeroSectionProps {
  webImages: HeroImage[];
  mobileImages: HeroImage[];
}

const MOBILE_QUERY = "(max-width: 767px)";

function subscribeToViewport(callback: () => void) {
  const media = window.matchMedia(MOBILE_QUERY);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export default function HeroSection(props: HeroSectionProps) {
  const isMobile = useSyncExternalStore(
    subscribeToViewport,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );

  return (
    <HeroSlideshow
      key={isMobile ? "mobile" : "desktop"}
      {...props}
      isMobile={isMobile}
    />
  );
}

function subscribeToMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function HeroSlideshow({
  webImages,
  mobileImages,
  isMobile,
}: HeroSectionProps & { isMobile: boolean }) {
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const [paused, setPaused] = useState(false);
  const [current, setCurrent] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(
    () => new Set(),
  );
  const desktop = webImages.length ? webImages : mobileImages;
  const mobile = mobileImages.length ? mobileImages : webImages;
  const slideCount = isMobile ? mobile.length : desktop.length;
  const next = (current + 1) % (slideCount || 1);
  const nextReady = loadedSlides.has(next);

  // Keep the current photo visible until the upcoming slide has loaded.
  useEffect(() => {
    if (slideCount <= 1 || !nextReady || paused || reducedMotion) return;
    const timer = window.setTimeout(() => setCurrent(next), 6000);
    return () => window.clearTimeout(timer);
  }, [current, next, nextReady, slideCount, paused, reducedMotion]);

  const visibleSlides = slideCount === 0 ? [] : [current];
  // Start only one slide ahead, after the visible image has finished loading.
  if (slideCount > 1 && loadedSlides.has(current)) visibleSlides.push(next);

  return (
    <section
      id="hero"
      aria-label="Product photography and creative content"
      className="relative isolate min-h-[620px] overflow-hidden bg-[#777068] md:min-h-[660px]"
      style={{ height: "calc(100svh - 76px)", maxHeight: 940 }}
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {desktop[0]?.preview && (
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={mobile[0]?.preview || desktop[0].preview}
            />
            <img
              src={desktop[0].preview}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        )}
        {visibleSlides.map((index) => {
          const desktopImage = desktop[index % desktop.length];
          const mobileImage = mobile[index % mobile.length];

          return (
            <picture key={index}>
              <source
                media="(max-width: 767px)"
                srcSet={mobileImage.srcSet || mobileImage.src}
                sizes="100vw"
              />
              {/* These files are optimized before serving, avoiding cold image processing. */}
              <img
                src={desktopImage.src}
                srcSet={desktopImage.srcSet || undefined}
                sizes="100vw"
                alt={`Beauty and wellness product photography by Epitome Creatives, image ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-cover ${index === current ? "opacity-100" : "opacity-0"}`}
                aria-hidden={index !== current}
                loading="eager"
                fetchPriority={index === current ? "high" : "low"}
                ref={(image) => {
                  // Cached images may finish before React hydrates the page.
                  if (image?.complete && image.naturalWidth > 0) {
                    setLoadedSlides((previous) =>
                      previous.has(index)
                        ? previous
                        : new Set(previous).add(index),
                    );
                  }
                }}
                onLoad={() =>
                  setLoadedSlides((previous) => {
                    if (previous.has(index)) return previous;
                    return new Set(previous).add(index);
                  })
                }
              />
            </picture>
          );
        })}
      </div>

      <div className="hero-shade absolute inset-0" aria-hidden="true" />
      <div className="hero-content site-wrap relative z-10 flex h-full min-h-[620px] items-end pb-24 pt-28 text-white md:min-h-[660px] md:items-center md:py-20">
        <div className="max-w-[720px]">
          <p className="eyebrow mb-5 text-white/90">
            Beauty · Wellness · Lifestyle
          </p>
          <h1 className="max-w-[680px] text-[clamp(2.6rem,5.8vw,5.5rem)] font-normal leading-[1.02] tracking-[-.05em]">
            Product photography.
            <br />
            Made to be
            <br className="hidden md:block" /> remembered.
          </h1>
          <p className="hero-support mt-6 max-w-[430px] text-[15px] leading-relaxed text-white/90 sm:text-base">
            Premium product photography, short-form video and creative campaigns
            for brands with a point of view.
          </p>
          <div className="hero-actions mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="#contact" className="studio-button studio-button-light">
              Enquire About a Shoot{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link href="#portfolio" className="text-link">
              View the portfolio <span aria-hidden="true">↓</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-6 z-10 text-white">
        <div className="site-wrap flex items-center justify-between gap-4">
          <p className="text-[9px] uppercase tracking-[.12em] text-white/85 sm:eyebrow">
            Independent studio · UK-based
          </p>
          {slideCount > 1 && !reducedMotion && (
            <button
              type="button"
              className="flex min-h-11 items-center shrink-0 whitespace-nowrap gap-3 px-2 text-xs"
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setPaused(!paused)}
            >
              <span aria-hidden="true">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(slideCount).padStart(2, "0")}
              </span>
              {paused ? <Play size={15} /> : <Pause size={15} />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
