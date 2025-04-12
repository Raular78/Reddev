"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  id: number
  title: string
  category: string
  year: string
  image: string
  useImageComponent?: boolean
  imageStyle?: React.CSSProperties
}

export function ProjectGrid() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "Innovación Digital",
      category: "Desarrollo Web",
      year: "2024",
      image: "/images/lechering.png",
      useImageComponent: true, // Usar el componente Image para mejor control
      imageStyle: {
        objectFit: "contain", // Hacer zoom out para mostrar más de la imagen
        borderRadius: "12px", // Redondear los bordes
      },
    },
    {
      id: 2,
      title: "Plataforma Nexus",
      category: "Aplicación Móvil",
      year: "2023",
      image: "/images/superadminpanel.png",
      useImageComponent: true, // Usar el componente Image para mejor control
      imageStyle: {
        objectFit: "contain", // Hacer zoom out para mostrar más de la imagen
        borderRadius: "12px", // Redondear los bordes
      },
    },
    {
      id: 3,
      title: "Interfaz Quantum",
      category: "Diseño UX/UI",
      year: "2023",
      image: "/images/addio.png",
      useImageComponent: true, // Usar el componente Image para mejor control
      imageStyle: {
        objectFit: "contain", // Hacer zoom out para mostrar más de la imagen
        borderRadius: "12px", // Redondear los bordes
      },
    },
    {
      id: 4,
      title: "Sistema Helix",
      category: "Software Empresarial",
      year: "2022",
      image: "/images/digicare.png",
      useImageComponent: true, // Usar el componente Image para mejor control
      imageStyle: {
        objectFit: "contain", // Hacer zoom out para mostrar más de la imagen
        borderRadius: "12px", // Redondear los bordes
      },
    },
  ]

  return (
    <div className="container mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
          >
            Proyectos
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-red-500"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-lg text-gray-400 max-w-md mt-6 md:mt-0"
        >
          Exploramos los límites de la tecnología para crear soluciones innovadoras que transforman industrias.
        </motion.p>
      </div>

      {/* Nuevo contenido textual optimizado para SEO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <p className="text-xl text-gray-300 max-w-3xl">
          Nuestro portafolio abarca desde sitios web corporativos de alto rendimiento hasta aplicaciones móviles
          innovadoras y plataformas digitales complejas. Cada proyecto refleja nuestro compromiso con la excelencia
          técnica, el diseño centrado en el usuario y los resultados comerciales tangibles.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: project.id * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative group"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className="relative overflow-hidden aspect-[4/3] rounded-lg">
              {project.useImageComponent ? (
                <motion.div
                  className="w-full h-full bg-black p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    style={project.imageStyle}
                    className="rounded-lg"
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
              )}

              <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <motion.div whileHover={{ rotate: 45 }} transition={{ duration: 0.3 }} className="text-white">
                      <ArrowUpRight className="h-6 w-6" />
                    </motion.div>
                  </div>
                  <p className="text-white mt-2">
                    {project.category} • {project.year}
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="h-1 bg-red-500 mt-2"
              initial={{ width: 0 }}
              animate={{ width: hoveredProject === project.id ? "100%" : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Contenido adicional optimizado para SEO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold mb-6 tracking-tight">Nuestro proceso</h3>
            <p className="text-gray-300 mb-4">
              Cada proyecto comienza con una inmersión profunda en tu negocio, objetivos y audiencia. Desarrollamos
              estrategias personalizadas que combinan diseño excepcional con tecnología avanzada para crear experiencias
              digitales que destacan en el mercado.
            </p>
            <p className="text-gray-300">
              Trabajamos en estrecha colaboración con nuestros clientes durante todo el proceso, desde la
              conceptualización hasta el lanzamiento y más allá, asegurando resultados que superan expectativas.
            </p>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 tracking-tight">Resultados</h3>
            <p className="text-gray-300 mb-4">
              Nuestros proyectos no solo destacan visualmente, sino que también generan resultados comerciales
              tangibles: aumento de conversiones, mejora en la retención de usuarios y fortalecimiento de la presencia
              digital de nuestros clientes.
            </p>
            <p className="text-gray-300">
              Implementamos análisis detallados y metodologías de mejora continua para optimizar constantemente el
              rendimiento de cada solución digital que desarrollamos.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-24 text-center"
      >
        <div className="flex flex-col items-center">
          <Link
            href="/proyectos"
            className="inline-flex items-center bg-red-500 text-white px-6 py-3 rounded-sm hover:bg-red-600 transition-colors"
          >
            Ver todos los proyectos
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-gradient-to-r from-red-800/30 to-black p-8 rounded-lg border border-gray-800 mt-16"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white text-center">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="text-gray-700 dark:text-gray-200 mb-6 text-center">
              Nuestro equipo está listo para convertir tu visión en una solución digital excepcional.
            </p>
            <div className="flex justify-center">
              <Link
                href="/contacto"
                className="bg-red-800 dark:bg-red-700 text-white px-6 py-3 rounded-sm flex items-center group hover:bg-red-900 dark:hover:bg-red-600 transition-colors"
              >
                Solicita una consulta gratuita
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}






