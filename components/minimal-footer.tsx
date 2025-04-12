"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUp } from "lucide-react"

export function MinimalFooter() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <footer className="py-16 bg-black border-t border-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="text-3xl font-bold tracking-tighter text-white">
              R<span className="text-red-500">.</span>
            </Link>
            <p className="text-gray-400 mt-4 max-w-xs">
              Creamos experiencias digitales que transforman ideas en realidad
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Empresa</h3>
              <ul className="space-y-2">
                {["Sobre nosotros", "Proyectos", "Servicios", "Equipo", "Contacto"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Servicios</h3>
              <ul className="space-y-2">
                {["Desarrollo Web", "Aplicaciones Móviles", "Diseño UX/UI", "Bases de Datos", "Consultoría"].map(
                  (item) => (
                    <li key={item}>
                      <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-2">
                {["Privacidad", "Términos", "Cookies", "Licencias"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2023 RedDev. Todos los derechos reservados.</p>

          <motion.button
            onClick={scrollToTop}
            className="p-3 border border-gray-800 hover:border-red-500 transition-colors group cursor-pointer"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp className="h-5 w-5 text-white group-hover:text-red-500 transition-colors" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}



