"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Download, FileText, Mail, Share2, Check } from "lucide-react"
import Link from "next/link"

// Componente de navegación simplificado para páginas internas
function InternalNavigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled ? "py-4 bg-black/80 backdrop-blur-md" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          R<span className="text-red-500">.</span>
        </Link>

        <Link href="/" className="flex items-center text-sm hover:text-red-500 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>
      </div>
    </header>
  )
}

export default function WhitePaperPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulación de envío
    setTimeout(() => {
      setSubmitted(true)
      setLoading(false)
    }, 1500)
  }

  return (
    <main className="bg-white dark:bg-black text-black dark:text-white min-h-screen pt-24 pb-32">
      <InternalNavigation />

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Contenido principal */}
          <div className="lg:w-2/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="text-red-500 text-sm font-medium">WHITEPAPER</span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mt-2 mb-6">
                El Futuro de la Automatización Empresarial con IA
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Descubre cómo la inteligencia artificial está transformando los procesos empresariales y cómo tu
                organización puede aprovechar esta revolución tecnológica.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-[16/9] relative rounded-lg overflow-hidden mb-12"
            >
              <img
                src="https://placehold.co/1200x675/1a1a1a/ef4444?text=AI+Automation+Whitepaper"
                alt="El Futuro de la Automatización Empresarial con IA"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="prose prose-lg dark:prose-invert max-w-none"
            >
              <h2>Resumen Ejecutivo</h2>
              <p>
                La inteligencia artificial (IA) está redefiniendo la forma en que las empresas operan, permitiendo
                niveles de automatización, personalización y eficiencia sin precedentes. Este whitepaper explora las
                tendencias actuales en automatización empresarial impulsada por IA, los beneficios tangibles para
                organizaciones de todos los tamaños y una hoja de ruta práctica para implementar estas tecnologías de
                manera efectiva.
              </p>

              <h2>Contenido del Whitepaper</h2>
              <ul>
                <li>Estado actual de la automatización empresarial</li>
                <li>Tecnologías de IA que están transformando los procesos de negocio</li>
                <li>Casos de uso prácticos por sector industrial</li>
                <li>Medición del ROI en proyectos de automatización con IA</li>
                <li>Desafíos comunes y cómo superarlos</li>
                <li>Hoja de ruta para la implementación exitosa</li>
                <li>Tendencias futuras y preparación estratégica</li>
              </ul>

              <h2>Por qué descargar este whitepaper</h2>
              <p>
                Este documento proporciona insights valiosos basados en nuestra experiencia implementando soluciones de
                automatización con IA para empresas líderes en diversos sectores. Incluye:
              </p>
              <ul>
                <li>Datos y estadísticas actualizadas sobre el impacto de la IA en la productividad empresarial</li>
                <li>Metodología paso a paso para identificar procesos automatizables</li>
                <li>Estrategias para gestionar el cambio organizacional</li>
                <li>Herramientas y tecnologías recomendadas según casos de uso</li>
                <li>Ejemplos reales de transformación digital exitosa</li>
              </ul>

              <blockquote>
                "La automatización impulsada por IA no solo optimiza procesos existentes, sino que permite reimaginar
                completamente modelos de negocio para crear nuevas fuentes de valor."
              </blockquote>

              <h2>Sobre los autores</h2>
              <p>
                Este whitepaper ha sido elaborado por el equipo de expertos en IA y automatización de RedDev, con más de
                10 años de experiencia implementando soluciones tecnológicas avanzadas para empresas de todos los
                tamaños.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full hover:border-red-500 transition-colors">
                <Share2 className="h-4 w-4" />
                Compartir
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full hover:border-red-500 transition-colors">
                <Mail className="h-4 w-4" />
                Enviar por email
              </button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-500/10 rounded-full">
                  <FileText className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold">Whitepaper PDF</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">32 páginas • 4.2 MB</p>
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      Email para recibir el whitepaper
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="tu@email.com"
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" id="consent" required className="mt-1 mr-2" />
                    <label htmlFor="consent" className="text-xs text-gray-500 dark:text-gray-400">
                      Acepto recibir comunicaciones de RedDev. Puedo darme de baja en cualquier momento. Consulta
                      nuestra{" "}
                      <Link href="/privacidad" className="text-red-500 hover:underline">
                        Política de Privacidad
                      </Link>
                      .
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-red-500 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Download className="h-5 w-5" />
                        Descargar ahora
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-full mb-4">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">¡Gracias!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Hemos enviado el whitepaper a tu correo electrónico.
                  </p>
                  <button className="w-full bg-red-500 text-white py-3 rounded-md flex items-center justify-center gap-2 hover:bg-red-600 transition-colors">
                    <Download className="h-5 w-5" />
                    Descargar directamente
                  </button>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8"
            >
              <h3 className="font-bold mb-4">Otros recursos relacionados</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/recursos/guia-implementacion-ia" className="flex items-start gap-3 group">
                    <div className="p-2 bg-blue-500/10 rounded-full mt-1">
                      <FileText className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-medium group-hover:text-red-500 transition-colors">
                        Guía de implementación de IA en empresas
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Guía práctica • 18 páginas</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/recursos/tendencias-automatizacion" className="flex items-start gap-3 group">
                    <div className="p-2 bg-green-500/10 rounded-full mt-1">
                      <FileText className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <span className="font-medium group-hover:text-red-500 transition-colors">
                        Tendencias en automatización 2023
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Informe • 24 páginas</p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/recursos/casos-exito" className="flex items-start gap-3 group">
                    <div className="p-2 bg-yellow-500/10 rounded-full mt-1">
                      <FileText className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <span className="font-medium group-hover:text-red-500 transition-colors">
                        Casos de éxito: Transformación digital
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Casos de estudio • 15 páginas</p>
                    </div>
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}


