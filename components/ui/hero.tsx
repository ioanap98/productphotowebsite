// components/ui/hero.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSectionProps {
  images: string[];
}

export default function HeroSection({ images }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section id="hero" className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[current] || '/placeholder.svg'}
              alt={`Slide ${current + 1}`}
              fill
              className="object-cover"
              priority={current === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Centered text & button */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6">
          Thoughtful Visuals
          <br />
         <span className="font-bold">for Growing Brands</span> 
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-10 opacity-95 max-w-3xl leading-relaxed">
          Clean, consistent visuals designed to showcase your products clearly and professionally.
        </p>
        <Button 
          size="lg" 
          className="bg-white text-black hover:bg-gray-100 font-semibold text-sm md:text-base px-8 md:px-10 py-6"
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

      {/* Navigation arrows */}
      <motion.button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-3"
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </motion.button>
      <motion.button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-3"
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </motion.button>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              idx === current ? 'bg-white' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
