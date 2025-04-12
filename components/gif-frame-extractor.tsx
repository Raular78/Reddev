"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// Esta es una implementación más avanzada que intenta extraer frames de un GIF
// Nota: La extracción de frames de GIF en el navegador es limitada
// Para una implementación real, considera pre-procesar el GIF en frames individuales

export function GifFrameExtractor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gifData, setGifData] = useState<any>(null)
  const [currentFrame, setCurrentFrame] = useState(0)

  // Configurar el scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Cargar y procesar el GIF
  useEffect(() => {
    // En una implementación real, usaríamos una biblioteca como gifuct-js
    // para decodificar y extraer frames de GIF

    const loadGif = async () => {
      try {
        const img = new Image()
        img.src = "/images/reddev-animation.gif"
        img.crossOrigin = "anonymous"

        img.onload = () => {
          // Aquí simularemos que tenemos los frames
          // En una implementación real, extraeríamos los frames del GIF
          setGifData({
            width: img.width,
            height: img.height,
            image: img,
            frameCount: 30, // Simulamos 30 frames
          })
        }
      } catch (error) {
        console.error("Error loading GIF:", error)
      }
    }

    loadGif()
  }, [])

  // Actualizar el frame basado en el scroll
  useEffect(() => {
    if (!gifData) return

    const unsubscribe = scrollYProgress.onChange((progress) => {
      const frameIndex = Math.min(Math.floor(progress * gifData.frameCount), gifData.frameCount - 1)
      setCurrentFrame(frameIndex)
    })

    return () => unsubscribe()
  }, [gifData, scrollYProgress])

  // Renderizar el frame actual
  useEffect(() => {
    if (!gifData || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar el canvas
    canvas.width = gifData.width
    canvas.height = gifData.height

    // En una implementación real, renderizaríamos el frame específico
    // Aquí simplemente dibujamos la imagen completa
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(gifData.image, 0, 0, canvas.width, canvas.height)

    // Simulamos un efecto basado en el frame actual
    const opacity = currentFrame / gifData.frameCount
    ctx.fillStyle = `rgba(239, 68, 68, ${opacity * 0.5})`
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [gifData, currentFrame])

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {gifData && <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />}

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

