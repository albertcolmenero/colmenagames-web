"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Target, Heart, Lightbulb } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Experiencia Humana",
      description: "Nos especializamos en crear conexiones auténticas entre personas a través del juego."
    },
    {
      icon: Target,
      title: "Metodología Profesional",
      description: "Combinamos rigor metodológico con creatividad para garantizar experiencias transformadoras."
    },
    {
      icon: Heart,
      title: "Alma Lúdica",
      description: "Creemos que el juego es la herramienta más poderosa para generar bienestar y conexión."
    },
    {
      icon: Lightbulb,
      title: "Innovación Continua",
      description: "Diseñamos experiencias únicas adaptadas a cada contexto, grupo y objetivo específico."
    }
  ]

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-b from-white via-secondary/30 to-white overflow-hidden">
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
            Expertos en diseñar{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-orange-500 bg-clip-text text-transparent">
              momentos inolvidables
            </span>{' '}
            que conectan personas
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                En <strong className="text-primary font-semibold">Colmena Experience</strong> creemos que las mejores conexiones humanas nacen a través del juego. 
                Somos especialistas en <strong className="text-foreground">gamificación, narrativa y dinámicas grupales</strong>, 
                y nuestro enfoque único combina metodología profesional con alma lúdica.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Diseñamos experiencias que van más allá del entretenimiento: creamos momentos que transforman equipos, 
                fortalecen vínculos y generan recuerdos duraderos. Desde <strong className="text-foreground">claustros educativos y equipos corporativos</strong> 
                hasta celebraciones familiares y eventos sociales.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Nuestra pasión es demostrar que el juego no es solo diversión: es una herramienta poderosa para el 
                <strong className="text-primary"> crecimiento personal y colectivo</strong>.
              </motion.p>
            </div>
          </motion.div>

          {/* Visual Element - Animated Hexagon Grid */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Central Logo/Icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl">
                  <Users className="w-16 h-16 text-white" />
                </div>
              </motion.div>

              {/* Orbiting Elements */}
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="absolute w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-primary/20"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  animate={{
                    rotate: [0, 360],
                    x: [0, Math.cos(index * Math.PI / 2) * 120],
                    y: [0, Math.sin(index * Math.PI / 2) * 120],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5
                  }}
                >
                  {React.createElement(feature.icon, { className: "w-8 h-8 text-primary" })}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Feature Cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/30"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: 10 }}
              >
                {React.createElement(feature.icon, { className: "w-6 h-6 text-white" })}
              </motion.div>
              
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
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
        
        <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2">
          <motion.div
            className="w-96 h-96 bg-gradient-to-l from-accent/10 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.5, 0.2],
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

export default About