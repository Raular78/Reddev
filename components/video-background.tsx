"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function VideoBackground({ scrollToSection }: { scrollToSection: (index: number) => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Configurar el scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Controlar la reproducción del video basado en el scroll
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Asegurarse de que el video esté pausado inicialmente
    video.pause()

    // Función para actualizar el tiempo del video basado en el scroll
    const updateVideoProgress = () => {
      if (!video) return

      const progress = scrollYProgress.get()
      if (video.duration) {
        video.currentTime = progress * video.duration
      }

      requestAnimationFrame(updateVideoProgress)
    }

    // Iniciar la actualización cuando el video esté cargado
    const handleVideoLoaded = () => {
      setVideoLoaded(true)
      video.pause() // Asegurarse de que el video esté pausado
      updateVideoProgress()
    }

    video.addEventListener("loadedmetadata", handleVideoLoaded)

    return () => {
      video.removeEventListener("loadedmetadata", handleVideoLoaded)
      cancelAnimationFrame(updateVideoProgress as any)
    }
  }, [scrollYProgress])

  // Efectos visuales basados en el scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -50])

  const finalTextOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])
  const finalTextY = useTransform(scrollYProgress, [0.7, 0.9], [20, 0])

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video de fondo */}
        <div className="absolute inset-0 z-0">
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/videos/reddev-animation.mp4"
            muted
            playsInline
            preload="auto"
          />

          {/* Overlay gradiente para mejorar legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 z-10" />
        </div>

        {/* Contenido del Hero */}
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="container mx-auto px-4 z-20 relative">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">Soluciones digitales para el futuro</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Desarrollamos software innovador que transforma negocios y crea experiencias excepcionales.
            </p>
            <motion.div whileHover={{ x: 10 }} className="inline-flex items-center group">
              <Link
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(5)
                }}
                className="text-lg border-b border-white pb-1 flex items-center group-hover:border-red-500 transition-colors"
              >
                Comencemos
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Texto final que aparece al final de la animación */}
        <motion.div
          style={{ opacity: finalTextOpacity, y: finalTextY }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <div className="text-center px-4">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">RedDev</h2>
            <p className="text-xl md:text-2xl text-red-500">Tecnología que transforma</p>
          </div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}



