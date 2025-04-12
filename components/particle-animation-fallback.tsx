"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"

interface Particle {
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  alpha: number
  originalX?: number
  originalY?: number
}

export function ParticleAnimationFallback() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Configurar el scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Inicializar y animar las partículas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el tamaño del canvas
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Crear partículas
    const particles: Particle[] = []
    const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 6000), 400)

    // Crear texto "REDDEV" en el canvas para obtener puntos
    ctx.fillStyle = "white"
    ctx.font = `bold ${Math.min(canvas.width / 5, 200)}px sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("REDDEV", canvas.width / 2, canvas.height / 2)

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
            color: `rgb(220, 38, 38)`, // Rojo puro (red-700) en lugar de tonos rosados
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            alpha: Math.random() * 0.5 + 0.5,
          })
        }
      }
    }

    // Añadir partículas adicionales aleatorias
    const randomParticleCount = particleCount - textParticles.length
    for (let i = 0; i < randomParticleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        color: `rgb(220, 38, 38)`, // Rojo puro (red-700) en lugar de tonos rosados
        vx: (Math.random() - 0.5) * 1,
        vy: (Math.random() - 0.5) * 1,
        alpha: Math.random() * 0.5 + 0.5,
      })
    }

    // Combinar partículas
    const allParticles = [...textParticles, ...particles]

    // Función para animar las partículas
    let animationFrameId: number

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Obtener el progreso del scroll
      const progress = scrollYProgress.get() || 0

      // Actualizar y dibujar partículas
      allParticles.forEach((particle) => {
        // Dibujar partícula
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Comportamiento basado en el progreso del scroll
        // Ajustado para que el texto se forme MUCHO más temprano (0.05 en lugar de 0.15)
        if (progress > 0.05 && particle.originalX !== undefined && particle.originalY !== undefined) {
          // Mover hacia posición original (para partículas de texto)
          const targetX = particle.originalX
          const targetY = particle.originalY

          // Calcular dirección y distancia
          const dx = targetX - particle.x
          const dy = targetY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Ajustar velocidad basada en el progreso - aumentada significativamente
          const speed = Math.min(0.15, (progress - 0.05) / 5)

          if (distance > 1) {
            particle.vx = dx * speed
            particle.vy = dy * speed
            particle.x += particle.vx
            particle.y += particle.vy
          } else {
            particle.x = targetX
            particle.y = targetY
          }
        } else {
          // Movimiento aleatorio (para todas las partículas al inicio)
          particle.x += particle.vx * (1 + progress)
          particle.y += particle.vy * (1 + progress)

          // Rebote en los bordes
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [scrollYProgress])

  // Transformaciones basadas en scroll
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const subtitleY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  // Ajustar también el momento en que aparece el texto final para que sea mucho antes
  const finalTextOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]) // Ajustado para aparecer antes
  const finalTextScale = useTransform(scrollYProgress, [0.25, 0.45], [0.8, 1]) // Ajustado para aparecer antes

  return (
    <div ref={containerRef} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Canvas para la animación de partículas */}
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {/* Contenido del Hero */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <motion.h1
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-[12vw] md:text-[10vw] font-bold tracking-tighter mb-4 leading-none text-center text-white"
          >
            RED<span className="text-red-custom">DEV</span>
          </motion.h1>

          <motion.p
            style={{ y: subtitleY, opacity: subtitleOpacity }}
            className="text-xl md:text-2xl max-w-md text-center font-light text-white"
          >
            Creamos experiencias digitales que transforman ideas en realidad
          </motion.p>
        </div>

        {/* Texto final que aparece */}
        <motion.div
          style={{
            opacity: finalTextOpacity,
            scale: finalTextScale,
          }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="text-center px-4 flex flex-col items-center">
            <h2 className="text-[15vw] font-bold tracking-tighter leading-none text-white">INNOVACIÓN</h2>
            <p className="text-xl md:text-2xl text-red-custom font-light tracking-widest mt-6 md:mt-2 max-w-md">
              TECNOLOGÍA QUE TRANSFORMA
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 bg-red-custom text-white px-6 py-3 rounded-sm flex items-center group"
            >
              Comienza tu proyecto
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                className="ml-2"
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm mb-2 font-light tracking-widest text-white">SCROLL</p>
            <ArrowDown className="h-5 w-5 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}






