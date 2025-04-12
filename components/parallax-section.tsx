"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
<<<<<<< HEAD
  offset?: any // Usamos any para evitar problemas de tipo
=======
  offset?: [string, string]
>>>>>>> 9bb3fcf8baf61504597b5f0c7c3d8b599a86f36e
}

export function ParallaxSection({
  children,
  className = "",
  speed = 0.2,
  direction = "up",
  offset = ["start end", "end start"],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

<<<<<<< HEAD
  // Usamos una aserción de tipo para evitar el error
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
=======
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
>>>>>>> 9bb3fcf8baf61504597b5f0c7c3d8b599a86f36e
  })

  // Calculate transform based on direction
  const transformUp = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  const transformDown = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const transformLeft = useTransform(scrollYProgress, [0, 1], ["0%", `${-speed * 100}%`])
  const transformRight = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  let transform
  switch (direction) {
    case "up":
      transform = transformUp
      break
    case "down":
      transform = transformDown
      break
    case "left":
      transform = transformLeft
      break
    case "right":
      transform = transformRight
      break
    default:
      transform = transformUp // Default to up if direction is not recognized
  }

  // Set the correct transform property based on direction
  const isHorizontal = direction === "left" || direction === "right"
  const motionStyle = isHorizontal ? { x: transform } : { y: transform }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={motionStyle} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}
<<<<<<< HEAD
=======

>>>>>>> 9bb3fcf8baf61504597b5f0c7c3d8b599a86f36e
