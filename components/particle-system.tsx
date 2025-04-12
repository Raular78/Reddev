"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  originalX: number
  originalY: number
  inPosition: boolean
}

export function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number | null>(null)
  const particlesInitialized = useRef(false)

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

  // Inicializar partículas
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0 || particlesInitialized.current) return

    const canvas = canvasRef.current
    if (!canvas) return

    // Configurar el canvas
    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Crear partículas
    const particleCount = Math.floor((dimensions.width * dimensions.height) / 10000) // Ajustar densidad
    const newParticles: Particle[] = []

    // Crear texto "REDDEV" en el canvas para obtener puntos
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "white"
    ctx.font = `bold ${Math.min(dimensions.width / 5, 200)}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("REDDEV", dimensions.width / 2, dimensions.height / 2)

    // Obtener datos de imagen
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Crear partículas basadas en los píxeles del texto
    const textParticles: Particle[] = []
    const step = 8 // Saltar píxeles para no tener demasiadas partículas

    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        const index = (y * canvas.width + x) * 4
        if (data[index] > 0) {
          // Si el píxel no es negro
          textParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            originalX: x,
            originalY: y,
            size: Math.random() * 2 + 1,
            color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
            vx: 0,
            vy: 0,
            inPosition: false,
          })
        }
      }
    }

    // Añadir partículas adicionales aleatorias
    const randomParticleCount = particleCount - textParticles.length
    for (let i = 0; i < randomParticleCount; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        originalX: Math.random() * canvas.width,
        originalY: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        inPosition: false,
      })
    }

    // Combinar partículas
    setParticles([...textParticles, ...newParticles])
    particlesInitialized.current = true
  }, [dimensions])

  // Animar partículas basado en el scroll
  useEffect(() => {
    if (particles.length === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Función para animar partículas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Obtener progreso de scroll
      const progress = scrollYProgress.get()

      // Dibujar partículas
      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Mover partículas basado en el progreso del scroll
        if (progress > 0.2) {
          // Mover hacia posición original
          const targetX = particle.originalX
          const targetY = particle.originalY

          // Calcular dirección y distancia
          const dx = targetX - particle.x
          const dy = targetY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Ajustar velocidad basada en el progreso
          const speed = Math.min(0.05, (progress - 0.2) / 10)

          if (distance > 1) {
            particle.vx = dx * speed
            particle.vy = dy * speed
            particle.x += particle.vx
            particle.y += particle.vy
          } else {
            particle.inPosition = true
            particle.x = targetX
            particle.y = targetY
          }
        } else {
          // Movimiento aleatorio
          particle.x += particle.vx
          particle.y += particle.vy

          // Rebotar en los bordes
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles, scrollYProgress])

  // Efectos visuales basados en el scroll
  const textOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])
  const textY = useTransform(scrollYProgress, [0.7, 0.9], [20, 0])

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Canvas donde se renderizan las partículas */}
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {/* Overlay para mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />

        {/* Texto que aparece al final de la animación */}
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

