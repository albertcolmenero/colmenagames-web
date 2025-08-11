"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  CheckCircle,
  Clock
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    groupType: '',
    participants: '',
    date: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        groupType: '',
        participants: '',
        date: '',
        message: ''
      })
    }, 3000)
  }

  const groupTypes = [
    "Empresa/Corporativo",
    "Claustro/Educativo", 
    "Familia/Amigos",
    "Celebración/Evento",
    "Asociación/Club",
    "Otro"
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hola@colmenaexperience.com",
      description: "Te respondemos en menos de 24h"
    },
    {
      icon: Phone,
      title: "Teléfono",
      value: "+34 XXX XXX XXX",
      description: "Disponible de 9:00 a 19:00"
    },
    {
      icon: MapPin,
      title: "Ubicación",
      value: "Madrid, España",
      description: "Experiencias en toda España"
    }
  ]

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-white via-secondary/20 to-primary/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl lg:text-6xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ¿Te imaginas tu grupo{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-orange-500 bg-clip-text text-transparent">
              viviendo una experiencia así?
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Escríbenos y diseñamos algo único para vosotros
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-white shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-accent p-8">
                <CardTitle className="text-3xl font-bold text-white flex items-center">
                  <span className="mr-3">👉</span>
                  Pide tu propuesta sin compromiso
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Nombre *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Tu nombre completo"
                          required
                          className="border-2 border-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                          required
                          className="border-2 border-primary/20 focus:border-primary"
                        />
                      </motion.div>
                    </div>

                    {/* Phone and Group Type Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Teléfono
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Tu teléfono"
                          className="border-2 border-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Tipo de grupo
                        </label>
                        <select
                          name="groupType"
                          value={formData.groupType}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 py-2 border-2 border-primary/20 rounded-md focus:border-primary focus:outline-none bg-background"
                        >
                          <option value="">Selecciona tu grupo</option>
                          {groupTypes.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                          ))}
                        </select>
                      </motion.div>
                    </div>

                    {/* Participants and Date Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Nº de personas
                        </label>
                        <Input
                          name="participants"
                          value={formData.participants}
                          onChange={handleInputChange}
                          placeholder="ej. 25 personas"
                          className="border-2 border-primary/20 focus:border-primary"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Fecha aproximada
                        </label>
                        <Input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="border-2 border-primary/20 focus:border-primary"
                        />
                      </motion.div>
                    </div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Cuéntanos tu idea
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Describe qué tipo de experiencia tienes en mente, el contexto, objetivos especiales, o cualquier detalle que nos pueda ayudar a diseñar algo perfecto para tu grupo..."
                        rows={4}
                        className="border-2 border-primary/20 focus:border-primary resize-none"
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            Enviando...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            Enviar propuesta
                          </div>
                        )}
                      </Button>
                    </motion.div>

                    <p className="text-sm text-muted-foreground text-center mt-4">
                      * Te responderemos en menos de 24 horas con una propuesta personalizada
                    </p>
                  </form>
                ) : (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      ¡Mensaje enviado!
                    </h3>
                    <p className="text-muted-foreground">
                      Gracias por contactarnos. Te responderemos pronto con una propuesta personalizada.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Additional Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            
            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/30"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  whileHover={{ y: -2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    {React.createElement(info.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{info.title}</h4>
                    <p className="text-lg font-semibold text-primary mb-1">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process Info */}
            <motion.div
              className="bg-gradient-to-br from-primary/5 via-accent/5 to-orange-500/10 p-8 rounded-3xl border border-primary/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Clock className="mr-3 w-8 h-8 text-primary" />
                ¿Cómo trabajamos?
              </h3>
              
              <div className="space-y-4">
                {[
                  "📞 Conversación inicial para entender tu grupo y objetivos",
                  "🎯 Diseño de propuesta personalizada sin compromiso", 
                  "✅ Refinamiento de la experiencia según tu feedback",
                  "🎉 Dinamización profesional de la experiencia",
                  "📈 Seguimiento post-experiencia y recogida de feedback"
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pricing Info */}
            <motion.div
              className="bg-white p-8 rounded-3xl shadow-lg border border-primary/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Sparkles className="mr-3 w-8 h-8 text-accent" />
                Información de precios
              </h3>
              <p className="text-muted-foreground mb-4">
                Nuestras experiencias se adaptan a diferentes presupuestos:
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• <strong>Experiencias básicas:</strong> Desde 25€ por persona</div>
                <div>• <strong>Experiencias premium:</strong> Desde 45€ por persona</div>
                <div>• <strong>Experiencias totalmente personalizadas:</strong> Consultar</div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                * Precios orientativos. La propuesta final dependerá del tipo de experiencia, duración, número de participantes y nivel de personalización.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact