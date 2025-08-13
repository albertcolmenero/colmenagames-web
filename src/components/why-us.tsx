"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Users, 
  Globe, 
  Sparkles, 
  Target, 
  Zap,
  Heart,
  Award
} from 'lucide-react'

const WhyUs = () => {
  const benefits = [
    {
      icon: CheckCircle2,
      title: "Actividades listas para usar o totalmente personalizadas",
      description: "Tenemos un catálogo de experiencias probadas, pero también creamos desde cero según tus necesidades específicas."
    },
    {
      icon: Globe,
      title: "Experiencias presenciales y online",
      description: "Nos adaptamos a cualquier formato: eventos en persona, virtuales o híbridos con la misma calidad y engagement."
    },
    {
      icon: Sparkles,
      title: "Metodología profesional con alma lúdica",
      description: "Combinamos rigor metodológico y psicología aplicada con la diversión y creatividad del juego."
    },
    {
      icon: Zap,
      title: "Rigor, creatividad y dinamización garantizada",
      description: "Cada experiencia está cuidadosamente diseñada para ser memorable, efectiva y transformadora."
    },
    {
      icon: Users,
      title: "Juegos para grupos de 5 a 150 personas",
      description: "Desde equipos pequeños hasta grandes convenciones, escalamos nuestras dinámicas sin perder intensidad."
    },
    {
      icon: Target,
      title: "Adaptación total al espacio, contexto y objetivo",
      description: "Analizamos tu entorno, cultura y metas para crear una experiencia que encaje perfectamente."
    }
  ]

  const stats = [
    { number: "100%", label: "Satisfacción Garantizada", icon: Heart },
    { number: "350+", label: "Experiencias Creadas", icon: Sparkles },
    { number: "5000+", label: "Personas Conectadas", icon: Users },
    { number: "95%", label: "Clientes Repiten", icon: Award }
  ]

  return (
    <section id="why-us" className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-white to-accent/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
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
            Más que juegos.{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Momentos que dejan huella
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Descubre por qué somos la elección preferida para crear experiencias transformadoras
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/30 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 10 }}
              >
                {React.createElement(stat.icon, { className: "w-8 h-8 text-white" })}
              </motion.div>
              
              <motion.div
                className="text-3xl lg:text-4xl font-bold text-primary mb-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              >
                {stat.number}
              </motion.div>
              
              <div className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-6 p-6 lg:p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/30 h-full">
                
                {/* Icon */}
                <motion.div
                  className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  {React.createElement(benefit.icon, { className: "w-8 h-8 text-white" })}
                </motion.div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-primary via-accent to-primary p-12 rounded-3xl text-white relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-white rounded-sm"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 180, 360],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                ¿Listo para transformar tu próximo evento?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Cada experiencia que creamos es única. Hablemos de cómo podemos hacer que tu grupo viva algo extraordinario.
              </p>
              
              <motion.button
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-2"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Conversemos sobre tu proyecto</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  →
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/4 -translate-x-1/2">
          <motion.div
            className="w-72 h-72 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="absolute right-0 bottom-1/4 translate-x-1/2">
          <motion.div
            className="w-96 h-96 bg-gradient-to-l from-accent/15 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default WhyUs