"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Don't show navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null
  }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-6 h-6 text-gold transition-transform group-hover:rotate-12" />
            <span className="font-serif text-xl font-semibold text-charcoal">Clínica Belle</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                isActive("/") ? "text-gold" : "text-charcoal hover:text-gold"
              }`}
            >
              Início
            </Link>
            <Link
              href="/agendar"
              className={`text-sm font-medium transition-colors ${
                isActive("/agendar") ? "text-gold" : "text-charcoal hover:text-gold"
              }`}
            >
              Agendar
            </Link>
            <Link
              href="/admin/login"
              className="px-4 py-2 bg-gold text-white text-sm font-medium rounded-lg hover:bg-gold/90 transition-colors"
            >
              Área Médica
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-charcoal hover:text-gold transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-sand-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive("/") ? "bg-sand-100 text-gold" : "text-charcoal hover:bg-sand-50"
              }`}
            >
              Início
            </Link>
            <Link
              href="/agendar"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive("/agendar") ? "bg-sand-100 text-gold" : "text-charcoal hover:bg-sand-50"
              }`}
            >
              Agendar
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 bg-gold text-white text-sm font-medium rounded-lg hover:bg-gold/90 transition-colors text-center"
            >
              Área Médica
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
