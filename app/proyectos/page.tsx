"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Filter, X, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Componente de navegación simplificado para páginas internas
function InternalNavigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled ? "py-4 bg-black/80 backdrop-blur-md" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          R<span className="text-red-500">.</span>
        </Link>

        <Link href="/" className="flex items-center text-sm hover:text-red-500 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Link>
      </div>
    </header>
  )
}

// Tipos para los proyectos
interface Project {
  id: number
  title: string
  description: string
  category: string
  year: string
  image: string
  technologies: string[]
  featured?: boolean
}

export default function ProyectosPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos")
  const [filterOpen, setFilterOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  // Datos de proyectos
  useEffect(() => {
    // Simulación de carga de datos
    setTimeout(() => {
      const projectsData: Project[] = [
        {
          id: 1,
          title: "Plataforma de Gestión Empresarial",
          description:
            "Sistema integral de gestión empresarial con módulos de CRM, facturación y análisis de datos en tiempo real para optimizar procesos internos.",
          category: "software-empresarial",
          year: "2023",
          image: "https://placehold.co/800x600/1a1a1a/ef4444?text=ERP+System",
          technologies: ["React", "Node.js", "MongoDB", "GraphQL"],
          featured: true,
        },
        {
          id: 2,
          title: "Aplicación Móvil de Finanzas",
          description:
            "Aplicación móvil para gestión financiera personal con funcionalidades de presupuesto, seguimiento de gastos y recomendaciones de inversión.",
          category: "aplicaciones-moviles",
          year: "2023",
          image: "https://placehold.co/800x600/1a1a1a/ef4444?text=Finance+App",
          technologies: ["React Native", "Firebase", "TensorFlow"],
        },
        {
          id: 3,
          title: "Portal E-commerce Premium",
          description:
            "Tienda online con experiencia de usuario personalizada, sistema de recomendaciones basado en IA y optimización avanzada de conversiones.",
          category: "desarrollo-web",
          year: "2022",
          image: "https://placehold.co/800x600/1a1a1a/ef4444?text=E-commerce",
          technologies: ["Next.js", "Tailwind CSS", "Stripe", "Algolia"],
          featured: true,
        },
        {
          id: 4,
          title: "Dashboard Analítico",
          description:
            "Panel de control interactivo para visualización de datos empresariales con gráficos personalizables y reportes automatizados.",
          category: "dashboards-bi",
          year: "2022",
          image: "https://placehold.co/800x600/1a1a1a/ef4444?text=Analytics+Dashboard",
          technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
        },
        {
          id: 5,
          title: "Sistema de Gestión Logística",
          description:
            "Plataforma para optimización de rutas, seguimiento de envíos y gestión de inventario con integración IoT para monitoreo en tiempo real.",
          category: "software-empresarial",
          year: "2022",
          image: "https://placehold.co/800x600/1a1a1a/ef4444?text=Logistics+System",
          technologies: ["Angular", "Express", "MongoDB", "Socket.io"],
        },
        {
          id: 6,
          title: "Plataforma Educativa",
          description:
            "Sistema de gestión de aprendizaje con contenido interactivo, evaluaciones automatizadas y seguimiento personalizado del progreso del estudiante.",
          category: "desarrollo-web",
          year: "2021",
          image: "https://placehold.co/800x600/1a1a1a/ef4444?text=Learning+Platform",
          technologies: ["React", "Node.js", "PostgreSQL", "WebRTC"],
        },
        {
          id: 7,
          title: "App de Salud y Bienestar",
          description:
            "Aplicación móvil para seguimiento de actividad física, nutrición y bienestar mental con recomendaciones personalizadas basadas en IA.",
          category: "aplicaciones-moviles",
          year: "2021",
          image: "https://placehold.co/800x600/1a1a1a/ef4444?text=Health+App",
          technologies: ["Flutter", "Firebase", "TensorFlow Lite"],
        },
        {
          id: 8,
          title: "CRM para Sector Inmobiliario",
          description:
            "Sistema de gestión de relaciones con clientes especializado para el sector inmobiliario con seguimiento de propiedades y automatización de marketing.",
          category: "software-empresarial",
          year: "2021",
          image: "https://placehold.co/800x600/1a1a1a/ef4444?text=Real+Estate+CRM",
          technologies: ["React", "Express", "MySQL", "Redis"],
        },
      ]

      setProjects(projectsData)
      setFilteredProjects(projectsData)
      setLoading(false)
    }, 1000)
  }, [])

  // Filtrar proyectos cuando cambia la categoría seleccionada
  useEffect(() => {
    if (selectedCategory === "todos") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter((project) => project.category === selectedCategory))
    }
  }, [selectedCategory, projects])

  // Categorías disponibles
  const categories = [
    { id: "todos", name: "Todos los proyectos" },
    { id: "desarrollo-web", name: "Desarrollo Web" },
    { id: "aplicaciones-moviles", name: "Aplicaciones Móviles" },
    { id: "software-empresarial", name: "Software Empresarial" },
    { id: "dashboards-bi", name: "Dashboards y BI" },
  ]

  return (
    <main className="bg-white dark:bg-black text-black dark:text-white min-h-screen pt-24 pb-32">
      <InternalNavigation />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
            >
              Proyectos
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-red-500"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-400 max-w-md mt-6 md:mt-0"
          >
            Exploramos los límites de la tecnología para crear soluciones innovadoras que transforman industrias.
          </motion.p>
        </div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-2xl font-bold mb-4 md:mb-0">
              {selectedCategory === "todos"
                ? "Todos los proyectos"
                : categories.find((cat) => cat.id === selectedCategory)?.name}
              <span className="text-gray-500 ml-2">({filteredProjects.length})</span>
            </h2>

            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center text-sm border border-gray-800 px-4 py-2 hover:border-red-500 transition-colors"
            >
              {filterOpen ? <X className="h-4 w-4 mr-2" /> : <Filter className="h-4 w-4 mr-2" />}
              {filterOpen ? "Cerrar filtros" : "Filtrar proyectos"}
            </button>
          </div>

          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-gray-800">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      selectedCategory === category.id
                        ? "bg-red-500 text-white"
                        : "bg-gray-900 text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Proyectos destacados */}
        {selectedCategory === "todos" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h2 className="text-3xl font-bold mb-8">Proyectos destacados</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {projects
                .filter((project) => project.featured)
                .map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="group relative overflow-hidden"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-gray-900 rounded-lg">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-8 flex flex-col justify-end">
                      <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-red-500 text-sm font-medium">
                            {project.category.replace(/-/g, " ").toUpperCase()}
                          </span>
                          <span className="text-gray-400 text-sm">{project.year}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="text-xs bg-gray-800 px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <Link
                          href={`/proyectos/${project.id}`}
                          className="inline-flex items-center text-white hover:text-red-500 transition-colors"
                        >
                          Ver proyecto
                          <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Lista de proyectos */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-red-500 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-500 text-xs font-medium">
                      {project.category.replace(/-/g, " ").toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-xs">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/proyectos/${project.id}`}
                    className="inline-flex items-center text-black dark:text-white hover:text-red-500 transition-colors"
                  >
                    Ver detalles
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-red-500/20 to-transparent dark:from-red-500/10 dark:to-black p-8 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">¿Tienes un proyecto en mente?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Nuestro equipo está listo para convertir tu visión en una solución digital excepcional.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center bg-red-500 text-white px-8 py-4 rounded-sm hover:bg-red-600 transition-colors"
            >
              Solicita una consulta gratuita
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}


