"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface ThreeDCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  perspective?: number
  shine?: boolean
}

export function ThreeDCard({
  children,
  className = "",
  intensity = 15,
  perspective = 1000,
  shine = true,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()

    // Calculate mouse position relative to card center (in percentage)
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Convert to percentage of card dimensions
    const rotateYPercentage = (mouseX / (rect.width / 2)) * intensity
    const rotateXPercentage = (mouseY / (rect.height / 2)) * intensity

    setRotateX(-rotateXPercentage)
    setRotateY(rotateYPercentage)

    // For shine effect
    if (shine) {
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })
    }
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: `${rotateX}deg`,
        rotateY: `${rotateY}deg`,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {shine && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255, 255, 255, 0.15), transparent 50%)`,
            opacity: Math.sqrt(rotateX * rotateX + rotateY * rotateY) / intensity,
          }}
        />
      )}
    </motion.div>
  )
}

