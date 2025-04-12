"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function StudioSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Ajustamos la velocidad del texto para que sea más rápido
  const textX = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]) // Cambiado de -50% a -100% para que se mueva más rápido
  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={containerRef} style={{ opacity: opacitySection }} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-red-800 dark:bg-red-700 mix-blend-multiply opacity-10" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-8"
            >
              Estudio
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-6"
            >
              RedDev es un estudio de desarrollo digital fundado en 2020 con la misión de crear soluciones tecnológicas
              innovadoras que impulsen el crecimiento de nuestros clientes.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-gray-700 dark:text-gray-300 mb-8"
            >
              Nuestro equipo está formado por desarrolladores, diseñadores y estrategas digitales apasionados por la
              tecnología y comprometidos con la excelencia.
            </motion.p>

            {/* Contenido textual optimizado para SEO */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-gray-700 dark:text-gray-300 mb-8"
            >
              Combinamos creatividad y tecnología para desarrollar experiencias digitales que no solo destacan
              visualmente, sino que también generan resultados tangibles para tu negocio. Nuestro enfoque centrado en el
              usuario garantiza soluciones que conectan con tu audiencia y potencian tu presencia digital.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-gray-700 dark:text-gray-300 mb-8"
            >
              En RedDev, entendemos que cada proyecto es único. Por eso, adoptamos un enfoque personalizado que comienza
              con una inmersión profunda en tu negocio, objetivos y audiencia. Nuestro proceso colaborativo asegura que
              cada solución digital que creamos esté perfectamente alineada con tu visión y estrategia empresarial.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div>
                <p className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">12+</p>
                <p className="text-gray-700 dark:text-gray-300">Profesionales</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">50+</p>
                <p className="text-gray-700 dark:text-gray-300">Proyectos completados</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">8+</p>
                <p className="text-gray-700 dark:text-gray-300">Países</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">3</p>
                <p className="text-gray-700 dark:text-gray-300">Premios de diseño</p>
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <div className="w-full h-full bg-[url('https://via.placeholder.com/800x800/1a1a1a/ef4444?text=RedDev')] bg-cover bg-center" />
              <motion.div
                initial={{ x: "100%" }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute -bottom-10 -left-10 bg-red-500 p-6 max-w-xs"
              >
                <p className="text-xl font-bold">Innovación constante</p>
                <p className="mt-2">Exploramos nuevas tecnologías para ofrecer soluciones de vanguardia</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="mt-32 overflow-hidden">
        {/* Texto en movimiento mejorado - más rápido y con mayor contraste */}
        <motion.div
          style={{ x: textX }}
          className="whitespace-nowrap text-[15vw] font-bold tracking-tighter text-white/30" // Aumentado contraste de 20% a 30%
        >
          <span className="mr-8">CREATIVIDAD</span>
          <span className="mr-8">•</span>
          <span className="mr-8">TECNOLOGÍA</span>
          <span className="mr-8">•</span>
          <span className="mr-8">INNOVACIÓN</span>
          <span className="mr-8">•</span>
          <span className="mr-8">DISEÑO</span>
          <span className="mr-8">•</span>
        </motion.div>
      </div>
    </motion.div>
  )
}





