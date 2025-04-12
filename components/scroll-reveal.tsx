"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  direction?: "up" | "down" | "left" | "right"
  threshold?: number
  delay?: number
  duration?: number
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  threshold = 0.1,
  delay = 0,
  duration = 0.8,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Calculate initial and animate values based on direction
  let initial = {}

  switch (direction) {
    case "up":
      initial = { opacity: 0, y: 50 }
      break
    case "down":
      initial = { opacity: 0, y: -50 }
      break
    case "left":
      initial = { opacity: 0, x: 50 }
      break
    case "right":
      initial = { opacity: 0, x: -50 }
      break
  }

  // Calculate opacity based on scroll progress
  const opacity = useTransform(scrollYProgress, [0, threshold, threshold + 0.1, 1], [0, 0, 1, 1])

  // Calculate transform based on direction and scroll progress
  const upTransform = useTransform(scrollYProgress, [0, threshold, threshold + 0.1, 1], [50, 50, 0, 0])
  const downTransform = useTransform(scrollYProgress, [0, threshold, threshold + 0.1, 1], [-50, -50, 0, 0])
  const leftTransform = useTransform(scrollYProgress, [0, threshold, threshold + 0.1, 1], [50, 50, 0, 0])
  const rightTransform = useTransform(scrollYProgress, [0, threshold, threshold + 0.1, 1], [-50, -50, 0, 0])

  let transform
  switch (direction) {
    case "up":
      transform = upTransform
      break
    case "down":
      transform = downTransform
      break
    case "left":
      transform = leftTransform
      break
    case "right":
      transform = rightTransform
      break
    default:
      transform = upTransform // Provide a default transform
  }

  // Set the correct transform property based on direction
  const isHorizontal = direction === "left" || direction === "right"
  const motionStyle = isHorizontal ? { opacity, x: transform } : { opacity, y: transform }

  return (
    <div ref={ref} className={`${className}`}>
      <motion.div style={motionStyle} transition={{ duration, delay, ease: "easeOut" }}>
        {children}
      </motion.div>
    </div>
  )
}

