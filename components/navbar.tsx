"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navLinkClassName =
    "rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:via-pink-100 hover:to-blue-100 hover:text-purple-700 hover:shadow-[0_10px_24px_rgba(168,85,247,0.10)]"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/70 bg-white/80 shadow-[0_12px_40px_rgba(168,85,247,0.08)] backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Epitome Creatives home" className="flex items-center">
            <span className="text-2xl font-bold transition-transform hover:scale-105">
              <span className="brand-gradient-text">
                EPITOME
              </span>
              <span className="brand-gradient-text ml-2">
                CREATIVES
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#services" className={navLinkClassName}>
              Services
            </Link>
            <Link href="#portfolio" className={navLinkClassName}>
              Portfolio
            </Link>
            <Link href="#about" className={navLinkClassName}>
              About
            </Link>
            <Link href="#contact" className={navLinkClassName}>
              Contact
            </Link>
          </nav>

          <button
            className="rounded-full p-2 text-slate-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:via-pink-100 hover:to-blue-100 hover:text-purple-700 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_18px_40px_rgba(168,85,247,0.10)] backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              <Link href="#portfolio" className={`${navLinkClassName} w-fit`}>
                Portfolio
              </Link>
              <Link href="#services" className={`${navLinkClassName} w-fit`}>
                Services
              </Link>
              <Link href="#about" className={`${navLinkClassName} w-fit`}>
                About
              </Link>
              <Link href="#contact" className={`${navLinkClassName} w-fit`}>
                Contact
              </Link>

            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
