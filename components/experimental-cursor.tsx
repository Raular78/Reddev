"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CursorProps {
  color?: string
}

export function ExperimentalCursor({ color = "#ef4444" }: CursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    // Mostrar cursor después de que se detecte el primer movimiento
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      // Usar directamente las coordenadas del mouse sin transformaciones adicionales
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    // Detectar cuando el cursor está sobre elementos interactivos
    const handleLinkHoverEvents = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, select").forEach((el) => {
        el.addEventListener("mouseenter", () => setLinkHovered(true))
        el.addEventListener("mouseleave", () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    return () => removeEventListeners()
  }, [])

  // Estilos del cursor simplificados para mayor precisión
  const cursorVariants = {
    default: {
      x: position.x - 8, // Reducido para mayor precisión
      y: position.y - 8,
      opacity: hidden ? 0 : 0.7,
    },
    clicked: {
      x: position.x - 8,
      y: position.y - 8,
      scale: 0.9,
      opacity: hidden ? 0 : 0.7,
    },
    hovered: {
      x: position.x - 16,
      y: position.y - 16,
      width: 32,
      height: 32,
      opacity: hidden ? 0 : 0.7,
      mixBlendMode: "difference" as const,
    },
  }

  // Determinar la variante actual
  const variant = clicked ? "clicked" : linkHovered ? "hovered" : "default"

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50 flex items-center justify-center"
      variants={cursorVariants}
      animate={variant}
      transition={{
        type: "spring",
        stiffness: 1000, // Aumentado para respuesta más inmediata
        damping: 40, // Aumentado para menos rebote
        mass: 0.2, // Reducido para movimiento más ligero
      }}
      style={{
        backgroundColor: linkHovered ? "white" : "transparent",
        border: `1px solid ${color}`,
      }}
    >
      {!linkHovered && (
        <motion.div
          className="w-1 h-1 rounded-full"
          style={{ backgroundColor: color }}
          animate={{ scale: clicked ? 1.5 : 1 }} // Reducido para ser menos intrusivo
          transition={{ duration: 0.1 }}
        />
      )}
    </motion.div>
  )
}

