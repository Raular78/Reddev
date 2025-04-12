"use client"

import { useState, useEffect, useRef } from "react"
import { Send, X, MessageSquare } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // URL del webhook de n8n en tu servidor
<<<<<<< HEAD
  const N8N_WEBHOOK_URL = "http://reddev.taxi-app.org/webhook/reddev-chatbot"
=======
  const N8N_WEBHOOK_URL = "https://212.227.105.97/webhook/reddev-chatbot"
>>>>>>> 9bb3fcf8baf61504597b5f0c7c3d8b599a86f36e

  // Enfoque automático en el input cuando se abre el chat
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Scroll automático al último mensaje
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Mensaje de bienvenida
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: "¡Hola! Soy el asistente virtual de RedDev. ¿En qué puedo ayudarte hoy?",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  // Gestionar sesión del chat
  useEffect(() => {
    // Recuperar mensajes anteriores de la sesión actual
    const savedMessages = localStorage.getItem("reddevChatMessages")
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        if (parsedMessages.length > 0) {
          setMessages(parsedMessages)
        }
      } catch (err) {
        console.error("Error al recuperar mensajes guardados:", err)
      }
    }
  }, [])

  // Guardar mensajes en localStorage cuando cambian
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("reddevChatMessages", JSON.stringify(messages))
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim()) return
    setError(null)

    // Añadir mensaje del usuario
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")
    setIsLoading(true)

    try {
      // Obtener o crear ID de sesión
      let sessionId = localStorage.getItem("chatSessionId")
      if (!sessionId) {
        sessionId = `session-${Date.now()}`
        localStorage.setItem("chatSessionId", sessionId)
      }

      // Enviar mensaje al webhook de n8n
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
          previousMessages: messages.map((m) => ({
            content: m.content,
            sender: m.sender,
            timestamp: m.timestamp.toISOString(),
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      // Añadir respuesta del bot
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: data.response || "Lo siento, no pude procesar tu solicitud.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error al enviar mensaje:", error)
      setError("No se pudo conectar con el asistente. Por favor, intenta de nuevo más tarde.")

      // Mensaje de error
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          content: "Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    if (window.confirm("¿Estás seguro de que deseas borrar toda la conversación?")) {
      setMessages([])
      localStorage.removeItem("reddevChatMessages")
      localStorage.removeItem("chatSessionId")

      // Añadir mensaje de bienvenida nuevamente
      setMessages([
        {
          id: "welcome",
          content: "¡Hola! Soy el asistente virtual de RedDev. ¿En qué puedo ayudarte hoy?",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botón para abrir/cerrar el chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Encabezado */}
          <div className="bg-red-500 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">Asistente RedDev</h3>
              <p className="text-xs opacity-75">Respuesta en tiempo real</p>
            </div>
            <button
              onClick={clearChat}
              className="text-white/70 hover:text-white transition-colors text-xs underline"
              aria-label="Borrar conversación"
            >
              Borrar chat
            </button>
          </div>

          {/* Mensajes */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-800">
            {messages.length === 0 && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <MessageSquare className="h-12 w-12 mb-2 opacity-50" />
                <p className="text-center">Inicia una conversación con nuestro asistente virtual</p>
              </div>
            )}

            {messages.map((msg) => (
              <div key={msg.id} className={`mb-4 ${msg.sender === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block p-3 rounded-lg max-w-[85%] ${
                    msg.sender === "user"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                  }`}
                >
                  {msg.content}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-500 mb-4">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-300 text-sm mb-4">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Entrada de mensaje */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center"
            >
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className={`p-2 ${
                  message.trim() && !isLoading ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"
                } text-white rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors`}
                aria-label="Enviar mensaje"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <div className="text-xs text-gray-500 mt-2 text-center">Powered by RedDev AI</div>
          </div>
        </div>
      )}
    </div>
  )
}
