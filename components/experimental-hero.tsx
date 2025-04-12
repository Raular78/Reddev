"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"

<<<<<<< HEAD
// Definimos la interfaz Particle para tipar correctamente el array de partículas
interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
  alpha: number
}

=======
>>>>>>> 9bb3fcf8baf61504597b5f0c7c3d8b599a86f36e
export function ExperimentalHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

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

  // Manejar movimiento del mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
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

    // Manejar errores de carga del video
    const handleVideoError = () => {
      console.error("Error al cargar el video desde la ruta:", video.src)
      setVideoLoaded(false)

      // Dibujar un mensaje de error en el canvas
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = "bold 20px sans-serif"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.fillText("Error al cargar el video", canvas.width / 2, canvas.height / 2 - 20)
      ctx.fillText("Usando animación alternativa", canvas.width / 2, canvas.height / 2 + 20)

      // Dibujar un patrón de partículas como fallback
      drawParticlesFallback(ctx, canvas)
    }

    // Función para dibujar partículas como fallback
    const drawParticlesFallback = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
<<<<<<< HEAD
      const particles: Particle[] = []
=======
      const particles = []
>>>>>>> 9bb3fcf8baf61504597b5f0c7c3d8b599a86f36e
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 300)

      // Crear partículas
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: `hsl(${Math.random() * 30 + 350}, 100%, 50%)`, // Tonos rojos
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          alpha: Math.random() * 0.5 + 0.5,
        })
      }

      // Animar partículas
      let lastTime = 0
      const animate = (timestamp: number) => {
        const deltaTime = timestamp - lastTime
        lastTime = timestamp

        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Obtener el progreso del scroll
        const progress = scrollYProgress.get() || 0

        for (let i = 0; i < particleCount; i++) {
          const p = particles[i]

          // Dibujar partícula
          ctx.globalAlpha = p.alpha
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()

          // Mover partícula
          p.x += p.speedX * (1 + progress)
          p.y += p.speedY * (1 + progress)

          // Rebote en los bordes
          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
          if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

          // Efecto de atracción al centro en la segunda mitad del scroll
          if (progress > 0.5) {
            const centerX = canvas.width / 2
            const centerY = canvas.height / 2
            const dx = centerX - p.x
            const dy = centerY - p.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            const attractionForce = (progress - 0.5) * 2 * 0.05

            p.speedX += (dx / distance) * attractionForce
            p.speedY += (dy / distance) * attractionForce
          }
        }

        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }

    // Función para actualizar el tiempo del video basado en el scroll
    const updateVideoProgress = () => {
      if (!video || !videoLoaded) return

      const progress = scrollYProgress.get()
      if (video.duration) {
        video.currentTime = progress * video.duration
      }

      // Dibujar el frame actual en el canvas con efectos
      drawVideoFrame(ctx, video, canvas, progress)

      requestAnimationFrame(updateVideoProgress)
    }

    // Iniciar la actualización cuando el video esté cargado
    const handleVideoLoaded = () => {
      setVideoLoaded(true)
      video.pause() // Asegurarse de que el video esté pausado

      // Iniciar el loop de actualización
      updateVideoProgress()
    }

    video.addEventListener("loadeddata", handleVideoLoaded)
    video.addEventListener("error", handleVideoError)

    return () => {
      video.removeEventListener("loadeddata", handleVideoLoaded)
      video.removeEventListener("error", handleVideoError)
      cancelAnimationFrame(updateVideoProgress as any)
    }
  }, [dimensions, scrollYProgress, videoLoaded])

  // Función para dibujar el frame del video con efectos
  const drawVideoFrame = (
    ctx: CanvasRenderingContext2D,
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    progress: number,
  ) => {
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

    // Aplicar distorsión basada en la posición del mouse
    if (isHovering) {
      const distortionX = (mousePosition.x - 0.5) * 30
      const distortionY = (mousePosition.y - 0.5) * 30

      // Dibujar video con distorsión
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.translate(distortionX, distortionY)
      ctx.translate(-canvas.width / 2, -canvas.height / 2)
      ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight)
      ctx.restore()
    } else {
      // Dibujar video normal
      ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight)
    }

    // Aplicar efectos basados en el progreso del scroll
    if (progress < 0.1) {
      // Efecto de viñeta al inicio
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7,
      )
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else if (progress > 0.9) {
      // Efecto de desvanecimiento al final
      ctx.fillStyle = `rgba(0, 0, 0, ${(progress - 0.9) * 10})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Aplicar efecto de grano
    applyGrainEffect(ctx, canvas, 0.03)
  }

  // Función para aplicar efecto de grano
  const applyGrainEffect = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, intensity: number) => {
    const grainCanvas = document.createElement("canvas")
    const grainCtx = grainCanvas.getContext("2d")
    if (!grainCtx) return

    grainCanvas.width = canvas.width
    grainCanvas.height = canvas.height

    const imageData = grainCtx.createImageData(grainCanvas.width, grainCanvas.height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() * 255 * intensity
      data[i] = value
      data[i + 1] = value
      data[i + 2] = value
      data[i + 3] = 255
    }

    grainCtx.putImageData(imageData, 0, 0)
    ctx.globalCompositeOperation = "overlay"
    ctx.drawImage(grainCanvas, 0, 0)
    ctx.globalCompositeOperation = "source-over"
  }

  // Transformaciones basadas en scroll
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const subtitleY = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  // Texto final que aparece
  const finalTextOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])
  const finalTextScale = useTransform(scrollYProgress, [0.7, 0.9], [0.8, 1])

  return (
    <div
      ref={containerRef}
      className="h-[300vh] relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Video oculto que se usa como fuente para el canvas */}
        <video
          ref={videoRef}
          className="hidden"
          src="/videos/reddev-animation.mp4"
          muted
          playsInline
          preload="auto"
          onError={() => {
            console.error("Error al cargar el video desde la ruta: /videos/reddev-animation.mp4")
            setVideoLoaded(false)
          }}
        />

        {/* Canvas donde se renderiza el video con efectos */}
        <canvas ref={canvasRef} className="w-full h-full object-cover" />

        {/* Contenido del Hero */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <motion.h1
            style={{ y: titleY, opacity: titleOpacity }}
            className="text-[12vw] md:text-[10vw] font-bold tracking-tighter mb-4 leading-none text-center text-white"
          >
            RED<span className="text-red-500">DEV</span>
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
          <div className="text-center px-4">
            <h2 className="text-[15vw] font-bold tracking-tighter leading-none mb-2 text-white">INNOVACIÓN</h2>
            <p className="text-xl md:text-2xl text-red-500 font-light tracking-widest">TECNOLOGÍA QUE TRANSFORMA</p>
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

        {/* Loader mientras el video carga */}
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="w-12 h-12 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}


