"use client"

import type React from "react"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  radius?: number
  onClick?: () => void
}

export function MagneticButton({
  children,
  className = "",
  strength = 30,
  radius = 150,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

    if (distance < radius) {
      // Calculate strength based on distance from center
      const strengthFactor = 1 - distance / radius

      setPosition({
        x: distanceX * strengthFactor * (strength / 10),
        y: distanceY * strengthFactor * (strength / 10),
      })
    } else {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

