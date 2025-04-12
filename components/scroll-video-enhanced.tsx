"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ScrollVideoEnhanced() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Configurar el scroll animation con un rango más preciso
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
        // Mapear el progreso del scroll al tiempo del video
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

  // Efectos visuales adicionales basados en el scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])
  const textY = useTransform(scrollYProgress, [0.7, 0.9], [20, 0])

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div style={{ scale }} className="w-full h-full">
          {!videoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
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
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <div className="text-center px-4">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">RedDev</h2>
            <p className="text-xl md:text-2xl text-red-500">Tecnología que transforma</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

