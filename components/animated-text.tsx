"use client"

import { useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface AnimatedTextProps {
  text: string
  el?: keyof JSX.IntrinsicElements
  className?: string
  once?: boolean
  repeatDelay?: number
  animation?: "typewriter" | "word-by-word" | "char-by-char" | "slide-up"
  delay?: number
}

const defaultAnimations = {
  typewriter: {
    hidden: { width: 0, opacity: 0 },
    visible: { width: "100%", opacity: 1 },
  },
  "word-by-word": {
    hidden: {},
    visible: {},
  },
  "char-by-char": {
    hidden: {},
    visible: {},
  },
  "slide-up": {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  },
}

export const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
  once = true,
  repeatDelay = 0,
  animation = "slide-up",
  delay = 0,
}: AnimatedTextProps) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: once, threshold: 0.2 })
  const [words, setWords] = useState<string[]>([])
  const [characters, setCharacters] = useState<string[]>([])

  useEffect(() => {
    if (animation === "word-by-word") {
      setWords(text.split(" "))
    } else if (animation === "char-by-char") {
      setCharacters(text.split(""))
    }
  }, [text, animation])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const show = () => {
      controls.start("visible")
      if (repeatDelay) {
        timeout = setTimeout(() => {
          controls.start("hidden")
          timeout = setTimeout(show, 500)
        }, repeatDelay)
      }
    }

    if (inView) {
      timeout = setTimeout(show, delay)
    }

    return () => clearTimeout(timeout)
  }, [inView, controls, repeatDelay, delay])

  if (animation === "typewriter") {
    return (
      <Wrapper className={className}>
        <motion.span
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={defaultAnimations.typewriter}
          transition={{
            duration: 1.5,
            delay,
            ease: "easeInOut",
          }}
          style={{
            display: "inline-block",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {text}
        </motion.span>
      </Wrapper>
    )
  }

  if (animation === "word-by-word") {
    return (
      <Wrapper className={className}>
        <motion.span ref={ref} initial="hidden" animate={controls} style={{ display: "inline-block" }}>
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              style={{ display: "inline-block", marginRight: "0.25em" }}
              custom={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: delay + i * 0.1,
                    ease: "easeOut",
                  },
                }),
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </Wrapper>
    )
  }

  if (animation === "char-by-char") {
    return (
      <Wrapper className={className}>
        <motion.span ref={ref} initial="hidden" animate={controls} style={{ display: "inline-block" }}>
          {characters.map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              style={{ display: "inline-block" }}
              custom={i}
              variants={{
                hidden: { opacity: 0, y: 10, rotate: 10 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  transition: {
                    duration: 0.3,
                    delay: delay + i * 0.05,
                    ease: "easeOut",
                  },
                }),
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      </Wrapper>
    )
  }

  // Default slide-up animation
  return (
    <Wrapper className={className}>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={defaultAnimations["slide-up"]}
        transition={{
          duration: 0.8,
          delay,
          ease: "easeOut",
        }}
        style={{ display: "inline-block" }}
      >
        {text}
      </motion.span>
    </Wrapper>
  )
}

