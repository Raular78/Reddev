"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function AdvancedParticleReveal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [videoReady, setVideoReady] = useState(false)

  // Configurar el scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Ajustar dimensiones al tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Controlar la reproducción del video basado en el scroll
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || dimensions.width === 0) return

    // Configurar el canvas
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Asegurarse de que el video esté pausado inicialmente
    video.pause()

    // Función para actualizar el tiempo del video basado en el scroll
    const updateVideoProgress = () => {
      if (!video || !videoReady) return

      const progress = scrollYProgress.get()
      if (video.duration) {
        video.currentTime = progress * video.duration
      }

      // Dibujar el frame actual en el canvas
      drawVideoFrame()
    }

    // Función para dibujar el frame actual del video en el canvas
    const drawVideoFrame = () => {
      if (!video || !canvas || !ctx || !videoReady) return

      // Calcular proporciones para mantener aspect ratio
      const videoRatio = video.videoWidth / video.videoHeight
      const canvasRatio = canvas.width / canvas.height

      let drawWidth,
        drawHeight,
        offsetX = 0,
        offsetY = 0

      if (canvasRatio > videoRatio) {
        // Canvas es más ancho que el video
        drawWidth = canvas.height * videoRatio
        drawHeight = canvas.height
        offsetX = (canvas.width - drawWidth) / 2
      } else {
        // Canvas es más alto que el video
        drawWidth = canvas.width
        drawHeight = canvas.width / videoRatio
        offsetY = (canvas.height - drawHeight) / 2
      }

      // Limpiar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Dibujar video centrado
      ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight)
    }

    // Iniciar la actualización cuando el video esté cargado
    const handleVideoLoaded = () => {
      setVideoLoaded(true)
      setVideoReady(true)
      video.pause() // Asegurarse de que el video esté pausado

      // Actualizar el tiempo del video basado en el scroll inicial
      updateVideoProgress()
    }

    // Suscribirse a cambios en el scroll
    const unsubscribeScroll = scrollYProgress.onChange(updateVideoProgress)

    video.addEventListener("loadeddata", handleVideoLoaded)

    return () => {
      video.removeEventListener("loadeddata", handleVideoLoaded)
      unsubscribeScroll()
    }
  }, [dimensions, scrollYProgress, videoReady])

  // Efectos visuales basados en el scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  const finalTextOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])
  const finalTextY = useTransform(scrollYProgress, [0.7, 0.9], [20, 0])

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video oculto que se usa como fuente para el canvas */}
        <video ref={videoRef} className="hidden" src="/videos/reddev-animation.mp4" muted playsInline preload="auto" />

        {/* Canvas donde se renderiza el video con efectos */}
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />

        {/* Loader mientras el video carga */}
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Contenido del Hero que se desvanece */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">Soluciones digitales para el futuro</h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300">
                Desarrollamos software innovador que transforma negocios y crea experiencias excepcionales.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Texto que aparece al final de la animación */}
        <motion.div
          style={{ opacity: finalTextOpacity, y: finalTextY }}
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

