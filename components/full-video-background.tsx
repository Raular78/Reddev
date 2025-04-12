"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// Este componente es una alternativa que hace que el video sea el fondo de toda la web
export function FullVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Configurar el scroll animation para toda la página
  const { scrollYProgress } = useScroll()

  // Controlar la reproducción del video basado en el scroll de toda la página
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
        // Podemos ajustar esto para que el video termine antes de llegar al final de la página
        const adjustedProgress = Math.min(progress * 1.5, 1) // Termina cuando el scroll llega al 66%
        video.currentTime = adjustedProgress * video.duration
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
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])

  return (
    <div className="fixed inset-0 -z-10">
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <motion.div style={{ opacity: videoOpacity }} className="absolute inset-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/reddev-animation.mp4"
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
      </motion.div>
    </div>
  )
}

