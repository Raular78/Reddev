"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MinimalNavigation } from "@/components/minimal-navigation"
import { ProjectGrid } from "@/components/project-grid"
import { StudioSection } from "@/components/studio-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { MinimalFooter } from "@/components/minimal-footer"
import { ParticleAnimationFallback } from "@/components/particle-animation-fallback"
import { AutomationAISection } from "../components/automation-ai-section"
import Link from "next/link"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)

  // Simular tiempo de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Detectar sección actual al hacer scroll usando IDs en lugar de refs
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      const sectionIds = ["hero", "proyectos", "estudio", "servicios", "automatizacion", "contacto"]

      sectionIds.forEach((id, index) => {
        const section = document.getElementById(id)
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setCurrentSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navegación suave al hacer clic en los enlaces del menú
  const scrollToSection = (index: number) => {
    const sectionIds = ["hero", "proyectos", "estudio", "servicios", "automatizacion", "contacto"]
    const section = document.getElementById(sectionIds[index])

    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
    }
  }

  // Eliminar la regla que anula el cursor pointer
  useEffect(() => {
    // Restaurar el cursor normal
    document.body.style.cursor = "auto"

    // Eliminar la regla que oculta el cursor nativo
    const style = document.createElement("style")
    style.innerHTML = `
    @media (min-width: 768px) {
      a, button, [role="button"], .cursor-pointer {
        cursor: pointer !important;
      }
    }
  `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="relative"
        >
          <div className="text-9xl font-bold tracking-tighter text-white">R</div>
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-red-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      </div>
    )
  }

  return (
    <main className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
      {/* Navegación */}
      <MinimalNavigation currentSection={currentSection} scrollToSection={scrollToSection} />

      {/* Sección Hero con Animación de Partículas */}
      <section id="hero">
        <ParticleAnimationFallback />
      </section>

      {/* Sección Proyectos */}
      <section id="proyectos">
        <ProjectGrid />
      </section>

      {/* Sección Estudio */}
      <section id="estudio">
        <StudioSection />
      </section>

      {/* Sección Servicios */}
      <section id="servicios">
        <ServicesSection />
      </section>

      {/* Nueva Sección de Automatizaciones e IA */}
      <section id="automatizacion">
        <AutomationAISection />
        <div className="container mx-auto px-6 mt-8 text-center">
          <Link
            href="/recursos/whitepaper"
            className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-sm hover:bg-red-600 transition-colors"
          >
            Descargar whitepaper sobre IA
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contacto">
        <ContactSection />
        <div className="container mx-auto px-6 mt-8 text-center">
          <Link
            href="/contacto"
            className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-sm hover:bg-red-600 transition-colors"
          >
            Formulario de contacto completo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <MinimalFooter />
    </main>
  )
}







