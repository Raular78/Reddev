"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [frames, setFrames] = useState<HTMLImageElement[]>([])
  const [totalFrames, setTotalFrames] = useState(0)
  const [frameWidth, setFrameWidth] = useState(0)
  const [frameHeight, setFrameHeight] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Configurar el scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Extraer frames del GIF
  useEffect(() => {
    const loadGif = async () => {
      try {
        // Cargar el GIF usando SuperGif (simulado aquí con frames individuales)
        // En un caso real, usaríamos una biblioteca para extraer frames de GIF
        // o preprocesaríamos el GIF en frames individuales

        // Para esta demo, vamos a simular 30 frames
        const simulatedFrameCount = 30
        setTotalFrames(simulatedFrameCount)

        // Crear array de imágenes para cada frame
        const frameImages: HTMLImageElement[] = []
        const img = new Image()
        img.src = "/images/reddev-animation.gif"
        img.crossOrigin = "anonymous"

        img.onload = () => {
          setFrameWidth(img.width)
          setFrameHeight(img.height)

          // En un caso real, extraeríamos cada frame
          // Aquí simplemente usamos la misma imagen para todos los frames
          for (let i = 0; i < simulatedFrameCount; i++) {
            frameImages.push(img)
          }

          setFrames(frameImages)
          setImagesLoaded(true)
        }
      } catch (error) {
        console.error("Error loading GIF:", error)
      }
    }

    loadGif()
  }, [])

  // Renderizar el frame actual basado en el scroll
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar el canvas
    canvas.width = frameWidth
    canvas.height = frameHeight

    // Función para renderizar el frame actual
    const renderFrame = () => {
      const scrollProgress = scrollYProgress.get()
      const frameIndex = Math.min(Math.floor(scrollProgress * totalFrames), totalFrames - 1)

      if (frames[frameIndex]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(frames[frameIndex], 0, 0, canvas.width, canvas.height)
      }

      requestAnimationFrame(renderFrame)
    }

    renderFrame()
  }, [imagesLoaded, frames, totalFrames, frameWidth, frameHeight, scrollYProgress])

  return (
    <div ref={containerRef} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="max-w-full max-h-full object-contain" />

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

