"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, Star, ChevronLeft, ChevronRight, Building2, Users, Heart } from 'lucide-react'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Directora de RRHH",
      company: "TechCorp Solutions",
      type: "empresa",
      icon: Building2,
      testimonial: "La experiencia con Colmena fue transformadora para nuestro equipo. El Detective Cases que diseñaron específicamente para nosotros logró que departamentos que apenas se hablaban ahora colaboren de manera natural. Increíble cómo el juego puede romper tantas barreras.",
      rating: 5,
      image: "👩‍💼"
    },
    {
      id: 2,
      name: "Carlos Ruiz",
      role: "Organizador de Eventos",
      company: "Celebraciones Únicas",
      type: "particular",
      icon: Heart,
      testimonial: "Contratamos a Colmena Experience para la boda de mi hermana y fue el momento más divertido de toda la celebración. La gimcana personalizada que crearon con la historia de los novios hizo reír y emocionar a todos los invitados. ¡100% recomendable!",
      rating: 5,
      image: "🎩"
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Coordinadora Académica",
      company: "Instituto Educativo San Marcos",
      type: "educativo",
      icon: Users,
      testimonial: "Nuestro claustro de profesores estaba pasando por un momento complicado. La experiencia gamificada que diseñaron no solo mejoró la comunicación entre nosotros, sino que nos recordó por qué elegimos ser educadores. Metodología impecable con resultados reales.",
      rating: 5,
      image: "👩‍🏫"
    },
    {
      id: 4,
      name: "Roberto Silva",
      role: "CEO",
      company: "StartUp Innovation Lab",
      type: "empresa",
      icon: Building2,
      testimonial: "Como startup, necesitábamos que nuestro equipo remoto se sintiera realmente conectado. La experiencia online que crearon superó todas nuestras expectativas. Ahora tenemos un equipo más unido y motivado. La inversión valió completamente la pena.",
      rating: 5,
      image: "👨‍💻"
    },
    {
      id: 5,
      name: "Elena Fernández",
      role: "Organizadora",
      company: "Reunión Familiar Anual",
      type: "particular",
      icon: Heart,
      testimonial: "Cada año organizamos una gran reunión familiar y este año quisimos algo especial. El Cluedo en vivo que prepararon con personajes basados en nuestra propia familia fue genial. Tres generaciones riéndose juntas - eso no tiene precio.",
      rating: 5,
      image: "👵"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'empresa':
        return 'from-blue-500 to-blue-600'
      case 'particular':
        return 'from-primary to-accent'
      case 'educativo':
        return 'from-green-500 to-green-600'
      default:
        return 'from-primary to-accent'
    }
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-secondary/30 via-white to-primary/5 overflow-hidden">
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
            Lo que dicen{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-orange-500 bg-clip-text text-transparent">
              nuestros clientes
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Testimonios reales de quienes han vivido una Colmena Experience
          </motion.p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    
                    {/* Quote and Content */}
                    <div className="lg:col-span-2">
                      {/* Quote Icon */}
                      <motion.div
                        className="mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        <Quote className="w-16 h-16 text-primary/30" />
                      </motion.div>
                      
                      {/* Testimonial Text */}
                      <motion.p
                        className="text-xl lg:text-2xl text-foreground leading-relaxed mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        &ldquo;{testimonials[currentIndex].testimonial}&rdquo;
                      </motion.p>
                      
                      {/* Rating */}
                      <motion.div
                        className="flex space-x-1 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                    
                    {/* Client Info */}
                    <motion.div
                      className="text-center lg:text-left"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {/* Avatar */}
                      <div className="w-24 h-24 mx-auto lg:mx-0 mb-4 text-6xl flex items-center justify-center bg-gradient-to-br from-secondary to-primary/20 rounded-full">
                        {testimonials[currentIndex].image}
                      </div>
                      
                      {/* Name and Role */}
                      <h4 className="text-2xl font-bold text-foreground mb-2">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-lg text-muted-foreground mb-2">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-primary font-semibold mb-4">
                        {testimonials[currentIndex].company}
                      </p>
                      
                      {/* Type Badge */}
                      <motion.div
                        className={`inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${getTypeColor(testimonials[currentIndex].type)} text-white rounded-full text-sm font-semibold`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {React.createElement(testimonials[currentIndex].icon, { className: "w-4 h-4" })}
                        <span className="capitalize">{testimonials[currentIndex].type}</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary scale-125'
                      : 'bg-primary/30 hover:bg-primary/60'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            </motion.button>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground font-medium">Clientes que repiten</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground font-medium">Satisfacción garantizada</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary mb-2">350+</div>
              <div className="text-muted-foreground font-medium">Experiencias creadas</div>
            </div>
          </div>
        </motion.div>

        {/* Background Decorative Elements */}
        <div className="absolute left-0 top-1/3 -translate-x-1/2">
          <motion.div
            className="w-64 h-64 bg-gradient-to-r from-primary/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Testimonials