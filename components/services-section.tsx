"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, Smartphone, Palette, ArrowRight, ShieldCheck, Cloud, Settings, LayoutDashboard } from "lucide-react"
import Link from "next/link"

interface Service {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
  features?: string[]
}

export function ServicesSection() {
  const [activeService, setActiveService] = useState<number>(1)

  const services: Service[] = [
    {
      id: 1,
      title: "Desarrollo Web",
      description:
        "Creamos sitios web y aplicaciones a medida con las últimas tecnologías para maximizar tu presencia digital. Nuestras soluciones son rápidas, seguras y escalables, optimizadas para SEO y con experiencias de usuario excepcionales.",
      icon: <Code className="h-8 w-8" />,
      color: "#ef4444",
      features: [
        "Desarrollo frontend con React, Vue y Angular",
        "Aplicaciones backend robustas con Node.js y Python",
        "Sitios web corporativos y tiendas e-commerce",
        "Optimización SEO y rendimiento web",
      ],
    },
    {
      id: 2,
      title: "Aplicaciones Móviles",
      description:
        "Desarrollamos apps nativas e híbridas que ofrecen experiencias excepcionales en todos los dispositivos. Nos enfocamos en la usabilidad, el rendimiento y la integración perfecta con tus sistemas existentes para potenciar tu negocio.",
      icon: <Smartphone className="h-8 w-8" />,
      color: "#3b82f6",
      features: [
        "Apps nativas para iOS y Android",
        "Soluciones híbridas con React Native y Flutter",
        "Integración con APIs y servicios en la nube",
        "Mantenimiento y actualizaciones continuas",
      ],
    },
    {
      id: 3,
      title: "Diseño UX/UI",
      description:
        "Diseñamos interfaces intuitivas y atractivas que mejoran la experiencia del usuario y aumentan la conversión. Cada pixel importa en nuestros diseños, creando experiencias digitales que conectan emocionalmente con tu audiencia.",
      icon: <Palette className="h-8 w-8" />,
      color: "#10b981",
      features: [
        "Investigación de usuarios y pruebas de usabilidad",
        "Wireframing y prototipos interactivos",
        "Sistemas de diseño escalables",
        "Animaciones e interacciones avanzadas",
      ],
    },
    {
      id: 4,
      title: "Software Empresarial",
      description:
        "Desarrollamos soluciones de software empresarial a medida que automatizan y optimizan los procesos críticos de tu negocio. Desde CRM y ERP hasta sistemas de gestión personalizados que se adaptan perfectamente a tus necesidades específicas.",
      icon: <Settings className="h-8 w-8" />,
      color: "#8b5cf6",
      features: [
        "CRM y sistemas de gestión de clientes personalizados",
        "ERP y soluciones de planificación de recursos",
        "CMS y gestores de contenido a medida",
        "Sistemas de gestión de inventario y logística",
      ],
    },
    {
      id: 5,
      title: "Ciberseguridad",
      description:
        "Protegemos tu negocio digital con soluciones de seguridad avanzadas que salvaguardan tus datos y aplicaciones contra amenazas cibernéticas. Implementamos las mejores prácticas para garantizar la integridad y confidencialidad de tu información.",
      icon: <ShieldCheck className="h-8 w-8" />,
      color: "#f59e0b",
      features: [
        "Auditorías de seguridad y pruebas de penetración",
        "Implementación de protocolos de seguridad",
        "Protección contra ataques DDoS y malware",
        "Cumplimiento de normativas (GDPR, HIPAA, etc.)",
      ],
    },
    {
      id: 6,
      title: "Cloud Computing",
      description:
        "Aprovecha el poder de la nube con nuestras soluciones de infraestructura escalable. Diseñamos, implementamos y gestionamos entornos cloud que optimizan costos y mejoran la disponibilidad de tus aplicaciones.",
      icon: <Cloud className="h-8 w-8" />,
      color: "#06b6d4",
      features: [
        "Arquitecturas serverless y microservicios",
        "Despliegue y gestión en AWS, Azure y Google Cloud",
        "Contenedores y orquestación con Docker y Kubernetes",
        "Optimización de costos y rendimiento en la nube",
      ],
    },
    {
      id: 7,
      title: "Dashboards y BI",
      description:
        "Creamos paneles de control interactivos y soluciones de Business Intelligence que transforman datos complejos en visualizaciones claras y accionables para una toma de decisiones más informada y estratégica.",
      icon: <LayoutDashboard className="h-8 w-8" />,
      color: "#ec4899",
      features: [
        "Dashboards interactivos y personalizables",
        "Integración con múltiples fuentes de datos",
        "Análisis en tiempo real y reportes automatizados",
        "Visualizaciones de datos avanzadas y KPIs",
      ],
    },
  ]

  return (
    <div className="container mx-auto px-6 py-32">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
      >
        Servicios
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 100 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="h-1 bg-red-500 mb-8"
      />

      {/* Nuevo contenido textual optimizado para SEO */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mb-16"
      >
        En RedDev, transformamos ideas en soluciones digitales innovadoras. Nuestro equipo multidisciplinario combina
        experiencia técnica con visión creativa para desarrollar productos digitales que destacan en el mercado actual.
        Ofrecemos servicios integrales adaptados a las necesidades específicas de cada cliente, desde desarrollo web
        hasta software empresarial a medida.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:block">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: service.id * 0.1 }}
              viewport={{ once: true }}
              className="mb-4 md:mb-8"
            >
              <button
                onClick={() => setActiveService(service.id)}
                className={`w-full text-left p-4 border-l-2 transition-all duration-300 cursor-pointer ${
                  activeService === service.id ? `border-l-[6px] pl-6` : "border-gray-700 hover:border-gray-500"
                }`}
                style={{
                  borderLeftColor: activeService === service.id ? service.color : undefined,
                }}
              >
                <div className="flex items-center">
                  <div
                    className="p-2 rounded-full mr-3"
                    style={{
                      backgroundColor: `${service.color}30`, // Aumentado de 20 a 30 para mayor visibilidad
                      boxShadow: `0 0 15px ${service.color}40`, // Añadido sombra para mayor visibilidad
                    }}
                  >
                    {service.icon}
                  </div>
                  <h3
                    className={`text-xl md:text-2xl font-bold transition-colors ${
                      activeService === service.id ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="relative h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {services.map(
              (service) =>
                activeService === service.id && (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 rounded-lg"
                    style={{ backgroundColor: `${service.color}10` }}
                  >
                    <div className="p-6 rounded-full mb-6" style={{ backgroundColor: `${service.color}20` }}>
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-300 mb-6">{service.description}</p>

                    {service.features && (
                      <div className="w-full max-w-md mb-6">
                        <ul className="grid grid-cols-1 gap-2 text-left">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="mr-2 mt-1 text-sm" style={{ color: service.color }}>
                                •
                              </div>
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Link
                      href={`/servicios/${service.id}`}
                      className="flex items-center text-black dark:text-white hover:text-red-500 transition-colors group"
                    >
                      Saber más
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      >
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:text-red-500" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Contenido adicional optimizado para SEO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div>
          <h3 className="text-3xl font-bold mb-6 tracking-tight">Nuestro enfoque</h3>
          <p className="text-gray-300 mb-4">
            Adoptamos un enfoque centrado en el usuario para cada proyecto, asegurando que cada solución no solo cumpla
            con los objetivos comerciales, sino que también proporcione una experiencia excepcional para el usuario
            final.
          </p>
          <p className="text-gray-300 mb-6">
            Combinamos metodologías ágiles con procesos de diseño iterativo para entregar productos de alta calidad que
            evolucionan con las necesidades de tu negocio y las expectativas de tus clientes.
          </p>
          <Link
            href="/servicios/metodologia"
            className="bg-transparent border border-red-500 text-white px-6 py-3 hover:bg-red-500/10 transition-colors flex items-center group"
          >
            Descubre nuestra metodología
            <ArrowRight className="ml-2 h-5 w-5 group-hover:text-red-500" />
          </Link>
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-6 tracking-tight">Tecnologías</h3>
          <p className="text-gray-300 mb-4">
            Trabajamos con las tecnologías más avanzadas y frameworks modernos como React, Next.js, Vue, Node.js, y
            Flutter, garantizando soluciones robustas, escalables y preparadas para el futuro.
          </p>
          <p className="text-gray-300 mb-6">
            Nuestro equipo se mantiene constantemente actualizado con las últimas tendencias y mejores prácticas en
            desarrollo web, diseño UX/UI y arquitectura de software.
          </p>
          <Link
            href="/servicios"
            className="bg-red-500 text-white px-6 py-3 flex items-center group hover:bg-red-600 transition-colors"
          >
            Consulta nuestros servicios
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-32 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para transformar tu negocio?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Nuestros expertos están preparados para ayudarte a alcanzar tus objetivos digitales.
          </p>
          <Link
            href="/contacto"
            className="bg-red-500 text-white px-8 py-4 rounded-sm inline-flex items-center group hover:bg-red-600 transition-colors"
          >
            Agenda una llamada estratégica
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
  )
}









