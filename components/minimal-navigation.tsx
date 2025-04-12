"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

interface MinimalNavigationProps {
  currentSection: number
  scrollToSection: (index: number) => void
}

export function MinimalNavigation({ currentSection, scrollToSection }: MinimalNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = ["INICIO", "PROYECTOS", "ESTUDIO", "SERVICIOS", "AUTOMATIZACIÓN & IA", "CONTACTO"]

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled ? "py-4 bg-black/80 dark:bg-black/80 backdrop-blur-md" : "py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            R<span className="text-red-custom">.</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="z-50 w-10 h-10 flex items-center justify-center text-black dark:text-white"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Menú de navegación fullscreen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black dark:bg-black z-30 flex items-center justify-center"
          >
            <nav className="text-center">
              <ul className="space-y-6">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="overflow-hidden"
                  >
                    <motion.button
                      onClick={() => {
                        scrollToSection(index)
                        setMenuOpen(false)
                      }}
                      className={`text-5xl md:text-7xl font-light tracking-tighter hover:text-red-custom transition-colors relative ${
                        currentSection === index ? "text-red-custom" : "text-white dark:text-white"
                      }`}
                      whileHover={{ x: 20 }}
                    >
                      {item}
                      {currentSection === index && (
                        <motion.span
                          layoutId="activeSection"
                          className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-red-custom rounded-full"
                        />
                      )}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}







