"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: "lift" | "tilt" | "glow" | "scale" | "border" | "none"
  delay?: number
}

export function AnimatedCard({ children, className = "", hoverEffect = "lift", delay = 0 }: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Base animation for card entrance
  const baseAnimation = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: "easeOut",
      },
    },
  }

  // Hover effects
  let hoverStyles = {}

  switch (hoverEffect) {
    case "lift":
      hoverStyles = {
        y: isHovered ? -10 : 0,
        transition: { duration: 0.3 },
      }
      break
    case "tilt":
      hoverStyles = {
        rotateX: isHovered ? 5 : 0,
        rotateY: isHovered ? 5 : 0,
        transition: { duration: 0.3 },
      }
      break
    case "glow":
      hoverStyles = {
        boxShadow: isHovered ? "0 0 20px rgba(239, 68, 68, 0.5)" : "none",
        transition: { duration: 0.3 },
      }
      break
    case "scale":
      hoverStyles = {
        scale: isHovered ? 1.05 : 1,
        transition: { duration: 0.3 },
      }
      break
    case "border":
      // Border effect is handled via className
      break
    case "none":
      hoverStyles = {}
      break
  }

  // Add border class if needed
  const borderClass = hoverEffect === "border" ? "border border-gray-800 hover:border-red-500 transition-colors" : ""

  return (
    <motion.div
      className={`${className} ${borderClass}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={baseAnimation}
      style={hoverStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </motion.div>
  )
}

