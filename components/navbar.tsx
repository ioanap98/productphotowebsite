"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["Portfolio", "/#portfolio"],
  ["Services", "/services"],
  ["The studio", "/#about"],
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setIsMenuOpen(false);
  return (
    <header
      className="sticky top-0 z-50 border-b border-[#deddd5] bg-[#f7f5f1]/95 backdrop-blur-md"
      onKeyDown={(event) => {
        if (event.key === "Escape" && isMenuOpen) {
          close();
          toggle.current?.focus();
        }
      }}
    >
      <div className="site-wrap flex min-h-[76px] items-center justify-between gap-4">
        <Link
          href="/"
          onClick={close}
          aria-label="Epitome Creatives home"
          className="shrink-0 text-[18px] font-bold tracking-[-.055em] sm:text-[23px]"
        >
          <span className="brand-gradient-text">EPITOME CREATIVES</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="py-3 text-xs hover:underline underline-offset-4"
            >
              {label}
            </Link>
          ))}
          <Link href="/#contact" className="studio-button">
            Enquire <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </nav>
        <button
          ref={toggle}
          type="button"
          className="grid size-11 place-items-center md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!isMenuOpen}
        className="border-t border-[#deddd5] bg-[#f7f5f1] px-6 pb-6 md:hidden"
      >
        {links.map(([label, href]) => (
          <Link
            key={href}
            onClick={close}
            href={href}
            className="block border-b border-[#deddd5] py-4 text-sm"
          >
            {label}
          </Link>
        ))}
        <Link
          href="/#contact"
          onClick={close}
          className="studio-button mt-5 w-full"
        >
          Enquire About a Shoot <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
