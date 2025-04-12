"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

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
      video.pause() // Asegurarse de que el video esté pausado
      updateVideoProgress()
    }

    video.addEventListener("loadedmetadata", handleVideoLoaded)

    return () => {
      video.removeEventListener("loadedmetadata", handleVideoLoaded)
    }
  }, [scrollYProgress])

  // Texto que aparece gradualmente al final de la animación
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/reddev-animation.mp4"
          muted
          playsInline
          preload="auto"
        />

        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">RedDev</h2>
            <p className="text-xl md:text-2xl text-red-500">Tecnología que transforma</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

