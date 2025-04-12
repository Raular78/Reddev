"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Bot, Cpu, Zap, BarChart, Code2, ArrowRight, Network, Brain, Settings } from "lucide-react"
import Link from "next/link"

export function AutomationAISection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div ref={containerRef} style={{ opacity: opacitySection }} className="py-32 relative overflow-hidden">
      {/* Fondo decorativo de IA */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full opacity-10 pointer-events-none">
        <div className="relative w-full h-full">
          <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Nodos de red neuronal */}
            {Array.from({ length: 20 }).map((_, i) => (
              <circle
                key={`node-${i}`}
                cx={100 + Math.random() * 600}
                cy={100 + Math.random() * 600}
                r={5 + Math.random() * 10}
                fill="#ef4444"
                opacity={0.3 + Math.random() * 0.7}
              />
            ))}
            {/* Conexiones de red neuronal */}
            {Array.from({ length: 40 }).map((_, i) => (
              <line
                key={`line-${i}`}
                x1={100 + Math.random() * 600}
                y1={100 + Math.random() * 600}
                x2={100 + Math.random() * 600}
                y2={100 + Math.random() * 600}
                stroke="#ef4444"
                strokeWidth="1"
                opacity={0.1 + Math.random() * 0.3}
              />
            ))}
            {/* Círculos decorativos */}
            <circle cx="400" cy="400" r="300" fill="none" stroke="url(#gradient)" strokeWidth="2" />
            <circle cx="400" cy="400" r="200" fill="none" stroke="url(#gradient)" strokeWidth="1.5" />
            <circle cx="400" cy="400" r="100" fill="none" stroke="url(#gradient)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
          <div className="md:w-3/5">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
            >
              Automatización
              <br className="hidden md:block" /> & IA
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-1 bg-red-500 mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 mb-8"
            >
              Potenciamos tu negocio con soluciones avanzadas de inteligencia artificial y automatización que optimizan
              procesos, reducen costos y generan nuevas oportunidades. Nuestras tecnologías inteligentes transforman
              datos en insights accionables para impulsar tu crecimiento.
            </motion.p>
          </div>

          <div className="md:w-2/5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="aspect-video relative rounded-lg overflow-hidden bg-gradient-to-br from-red-500/20 to-black border border-gray-800"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-24 h-24 text-red-500/50" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-sm text-red-500 font-semibold mb-2">TECNOLOGÍA AVANZADA</p>
                <h3 className="text-2xl font-bold">Inteligencia Artificial para tu Negocio</h3>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Bot className="h-8 w-8 text-red-500" />,
              title: "Inteligencia Artificial",
              description:
                "Implementamos soluciones de IA personalizadas que aprenden y evolucionan con tu negocio, desde chatbots inteligentes hasta sistemas de recomendación avanzados que mejoran la experiencia del usuario.",
            },
            {
              icon: <Cpu className="h-8 w-8 text-red-500" />,
              title: "Machine Learning",
              description:
                "Desarrollamos modelos predictivos y algoritmos de aprendizaje automático que identifican patrones en tus datos para optimizar decisiones comerciales y anticipar tendencias del mercado.",
            },
            {
              icon: <Zap className="h-8 w-8 text-red-500" />,
              title: "Automatización de Procesos",
              description:
                "Diseñamos flujos de trabajo automatizados que eliminan tareas repetitivas, reducen errores y liberan a tu equipo para enfocarse en actividades de mayor valor estratégico.",
            },
            {
              icon: <BarChart className="h-8 w-8 text-red-500" />,
              title: "Análisis Predictivo",
              description:
                "Transformamos tus datos en previsiones precisas que impulsan estrategias proactivas, optimizan inventarios y mejoran la planificación de recursos empresariales.",
            },
            {
              icon: <Code2 className="h-8 w-8 text-red-500" />,
              title: "Integración de Sistemas",
              description:
                "Conectamos tus plataformas existentes con soluciones de IA y automatización mediante APIs robustas y microservicios que garantizan un flujo de datos eficiente y seguro.",
            },
            {
              icon: <Settings className="h-8 w-8 text-red-500" />,
              title: "Software Empresarial",
              description:
                "Desarrollamos soluciones de software empresarial a medida como CRM, CMS, ERP y sistemas de gestión que automatizan y optimizan los procesos críticos de tu negocio.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/30 p-8 rounded-lg border border-gray-800 hover:border-red-500 transition-all duration-300"
            >
              <div className="p-4 rounded-full bg-red-500/10 inline-block mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">Transformación Digital Inteligente</h3>
            <p className="text-gray-300 mb-6">
              En RedDev, no solo implementamos tecnología; diseñamos estrategias de transformación digital que
              aprovechan el poder de la IA para crear ventajas competitivas sostenibles. Nuestras soluciones se adaptan
              a las necesidades específicas de tu industria, ya sea comercio electrónico, finanzas, salud o manufactura.
            </p>
            <p className="text-gray-300 mb-6">
              Trabajamos con las tecnologías más avanzadas en el campo de la inteligencia artificial, incluyendo
              procesamiento de lenguaje natural (NLP), visión por computadora, y aprendizaje profundo, para desarrollar
              soluciones que redefinen lo posible en tu sector.
            </p>
            <ul className="space-y-3">
              {[
                "Optimización de operaciones mediante IA predictiva",
                "Automatización de flujos de trabajo complejos",
                "Análisis de datos en tiempo real para decisiones ágiles",
                "Personalización avanzada de experiencias de usuario",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="mr-3 mt-1 text-red-500">•</div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-red-500/20 to-black rounded-lg flex items-center justify-center p-8">
              <div className="relative w-full h-full border border-gray-800 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  <Network className="w-32 h-32 text-red-500/30" />
                </div>
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-8">
                  <h4 className="text-2xl font-bold mb-4">Potencia tu negocio con IA</h4>
                  <p className="text-gray-300 mb-6">
                    Nuestras soluciones de IA y automatización han ayudado a empresas a incrementar su eficiencia
                    operativa hasta un 40% y mejorar la satisfacción del cliente en un 35%.
                  </p>
                  <Link
                    href="/servicios/ia-demo"
                    className="bg-red-500 text-white px-6 py-3 rounded-lg flex items-center"
                  >
                    Descubre cómo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 p-8 bg-gradient-to-r from-red-500/10 to-transparent rounded-lg border border-gray-800"
        >
          <h3 className="text-3xl font-bold mb-4">Casos de Éxito en IA y Automatización</h3>
          <p className="text-gray-300 mb-6">
            Nuestras soluciones de IA y automatización han generado resultados excepcionales para clientes en diversos
            sectores:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                client: "TechRetail",
                result:
                  "Incremento del 45% en conversiones mediante un sistema de recomendación personalizado basado en IA",
              },
              {
                client: "FinSecure",
                result: "Reducción del 60% en detección de fraudes con algoritmos de machine learning avanzados",
              },
              {
                client: "LogiTech",
                result:
                  "Optimización de rutas logísticas que redujo costos operativos en un 30% mediante IA predictiva",
              },
            ].map((item, index) => (
              <div key={index} className="p-6 bg-black/30 rounded-lg">
                <h4 className="text-xl font-bold mb-2">{item.client}</h4>
                <p className="text-gray-300">{item.result}</p>
              </div>
            ))}
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
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Potencia tu negocio con IA</h3>
            <p className="text-xl text-gray-300 mb-8">
              Descubre cómo nuestras soluciones de inteligencia artificial pueden transformar tu empresa y crear
              ventajas competitivas sostenibles.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="bg-red-500 text-white px-8 py-4 rounded-sm flex items-center justify-center group"
              >
                Solicita una demo
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  className="ml-2"
                >
                  →
                </motion.span>
              </Link>
              <Link
                href="/recursos/whitepaper"
                className="border border-red-500 text-white px-8 py-4 rounded-sm flex items-center justify-center group hover:bg-red-500/10 transition-colors"
              >
                Descarga nuestro whitepaper
                <ArrowRight className="ml-2 h-5 w-5 group-hover:text-red-500" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}









