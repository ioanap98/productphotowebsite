"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-black">
            EPITOME CREATIVES
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-gray-600 hover:text-black transition-colors">
              Services
            </Link>
            <Link href="#portfolio" className="text-gray-600 hover:text-black transition-colors">
              Portfolio
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-black transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-black transition-colors">
              Contact
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="#portfolio" className="text-gray-600 hover:text-black transition-colors">
                Portfolio
              </Link>
              <Link href="#services" className="text-gray-600 hover:text-black transition-colors">
                Services
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-black transition-colors">
                About
              </Link>
              <Link href="#contact" className="text-gray-600 hover:text-black transition-colors">
                Contact
              </Link>

            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
