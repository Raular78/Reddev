"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Phone, MapPin } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setFormState({ name: "", email: "", message: "" })

      // Resetear después de 3 segundos
      setTimeout(() => {
        setFormStatus("idle")
      }, 3000)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-6 py-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
          >
            Contacto
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
          ¿Tienes un proyecto en mente? Estamos listos para convertir tus ideas en realidad.
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl"
        >
          En RedDev, cada proyecto comienza con una conversación. Nos apasiona entender tus objetivos, desafíos y visión
          para crear soluciones digitales que impulsen tu negocio. Nuestro equipo está listo para responder a tus
          preguntas y explorar cómo podemos colaborar en tu próximo proyecto digital.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-700 py-3 focus:border-red-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-gray-700 py-3 focus:border-red-500 outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-transparent border-b border-gray-700 py-3 focus:border-red-500 outline-none transition-colors"
              />
            </div>

            <motion.button
              type="submit"
              disabled={formStatus === "sending" || formStatus === "success"}
              className="bg-red-500 text-white px-8 py-3 flex items-center justify-center group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-black dark:bg-white/20"
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

                {formStatus === "success" && (
                  <>
                    Mensaje enviado
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-2 h-5 w-5 flex items-center justify-center"
                    >
                      ✓
                    </motion.div>
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-start">
            <div className="p-3 bg-red-500 bg-opacity-10 rounded-full mr-4">
              <Mail className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-gray-400">info@reddev.com</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="p-3 bg-red-500 bg-opacity-10 rounded-full mr-4">
              <Phone className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Teléfono</h3>
              <p className="text-gray-400">+34 123 456 789</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="p-3 bg-red-500 bg-opacity-10 rounded-full mr-4">
              <MapPin className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Dirección</h3>
              <p className="text-gray-400">Calle Tecnología 123, Madrid, España</p>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-800">
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              {["Twitter", "Instagram", "LinkedIn", "GitHub"].map((social) => (
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

          {/* Contenido adicional optimizado para SEO */}
          <div className="pt-8 mt-8 border-t border-gray-800">
            <h3 className="text-xl font-bold mb-4">Horario de atención</h3>
            <p className="text-gray-400 mb-2">Lunes a Viernes: 9:00 - 18:00</p>
            <p className="text-gray-400">
              También puedes agendar una consulta virtual en cualquier momento a través de nuestro formulario de
              contacto.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}



