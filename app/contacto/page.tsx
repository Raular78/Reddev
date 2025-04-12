"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Send, Mail, Phone, MapPin, Check } from "lucide-react"
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

export default function ContactoPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("sending")

    // Simulación de envío
    setTimeout(() => {
      setFormStatus("success")
      setFormState({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      })

      // Resetear después de 5 segundos
      setTimeout(() => {
        setFormStatus("idle")
      }, 5000)
    }, 1500)
  }

  return (
    <main className="bg-black text-white min-h-screen pt-24 pb-32">
      <InternalNavigation />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Contacto</h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-red-500 mb-8"
          />
          <p className="text-xl text-gray-300 max-w-3xl">
            ¿Tienes un proyecto en mente? Estamos listos para convertir tus ideas en realidad. Nuestro equipo de
            expertos está disponible para responder a tus preguntas y explorar cómo podemos colaborar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Formulario de contacto */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>

              {formStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-400 mb-6">
                    Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
                  </p>
                  <button onClick={() => setFormStatus("idle")} className="text-red-500 hover:underline">
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-400 mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-2">
                      Servicio de interés *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="desarrollo-web">Desarrollo Web</option>
                      <option value="aplicaciones-moviles">Aplicaciones Móviles</option>
                      <option value="software-empresarial">Software Empresarial</option>
                      <option value="automatizacion-ia">Automatización & IA</option>
                      <option value="diseno-ux-ui">Diseño UX/UI</option>
                      <option value="consultoria">Consultoría Tecnológica</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" id="privacy" required className="mt-1 mr-2" />
                    <label htmlFor="privacy" className="text-xs text-gray-400">
                      He leído y acepto la{" "}
                      <Link href="/privacidad" className="text-red-500 hover:underline">
                        Política de Privacidad
                      </Link>{" "}
                      y autorizo el tratamiento de mis datos.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="bg-red-500 text-white px-8 py-3 rounded-md flex items-center justify-center group relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-black"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <span className="relative flex items-center">
                      {formStatus === "idle" && (
                        <>
                          Enviar mensaje
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}

                      {formStatus === "sending" && (
                        <>
                          Enviando...
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                            className="ml-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                          />
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-start">
              <div className="p-3 bg-red-500 bg-opacity-10 rounded-full mr-4">
                <Mail className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-400">info@reddev.com</p>
                <p className="text-gray-400">soporte@reddev.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 bg-red-500 bg-opacity-10 rounded-full mr-4">
                <Phone className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Teléfono</h3>
                <p className="text-gray-400">+34 123 456 789</p>
                <p className="text-gray-400">+34 987 654 321</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="p-3 bg-red-500 bg-opacity-10 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Dirección</h3>
                <p className="text-gray-400">Calle Tecnología 123</p>
                <p className="text-gray-400">28001 Madrid, España</p>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-800">
              <h3 className="text-xl font-bold mb-4">Horario de atención</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Lunes - Viernes</p>
                  <p className="text-gray-400">9:00 - 18:00</p>
                </div>
                <div>
                  <p className="font-medium">Sábado - Domingo</p>
                  <p className="text-gray-400">Cerrado</p>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-800">
              <h3 className="text-xl font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                {["Twitter", "LinkedIn", "Instagram", "GitHub"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="p-3 border border-gray-800 hover:border-red-500 transition-colors"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {social[0]}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-gray-800">
              <h3 className="text-xl font-bold mb-4">Ubicación</h3>
              <div className="aspect-[16/9] bg-gray-800 rounded-lg overflow-hidden">
                {/* Aquí iría un mapa real, por ahora un placeholder */}
                <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-500">Mapa de ubicación</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

