"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ScrollAnimationAdvanced() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  // Configurar el scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Controlar la reproducción del video basado en el scroll
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    // Función para actualizar el tiempo del video basado en el scroll
    const updateVideoProgress = () => {
      if (!video || !containerRef.current) return

      const scrollProgress = scrollYProgress.get()
      const videoDuration = video.duration

      if (videoDuration) {
        // Establecer el tiempo del video basado en el progreso del scroll
        video.currentTime = scrollProgress * videoDuration
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
    }
  }, [scrollYProgress])

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/videos/reddev-animation.mp4" // Reemplazar con tu video real
          muted
          playsInline
          preload="auto"
        />

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <motion.div style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]) }} className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">RedDev</h2>
            <p className="text-xl md:text-2xl text-red-500">Tecnología que transforma</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

