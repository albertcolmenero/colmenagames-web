"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Play, Users, Sparkles, ArrowRight } from 'lucide-react'

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const floatingElements = [
    { icon: Sparkles, delay: 0, x: 100, y: 50 },
    { icon: Users, delay: 0.5, x: -80, y: 80 },
    { icon: Play, delay: 1, x: 150, y: -60 },
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Animated Geometric Shapes */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Dice Pattern */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/10 rounded-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="block"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                background: 'linear-gradient(90deg, #ffffff, #fbbf24, #ffffff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Juega.
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Conecta.
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Transforma tu equipo.
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Creamos experiencias gamificadas a medida para cualquier grupo humano: desde claustros y empresas hasta fiestas y celebraciones. 
            <span className="font-semibold text-yellow-300"> Conecta como nunca. Disfruta como siempre.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
              size="lg"
            >
              <span className="mr-2">👉</span>
              Quiero vivir una Colmena Experience
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={() => scrollToSection('#about')}
              variant="outline"
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
              size="lg"
            >
              Conoce más sobre nosotros
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">5-150</div>
              <div className="text-white/80 font-medium">Personas por grupo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80 font-medium">Personalizable</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-white/80 font-medium">Posibilidades</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Interactive Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              right: `${element.x}px`,
              top: `50%`,
              transform: `translateY(${element.y}px)`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          >
            {React.createElement(element.icon, { className: "w-8 h-8 text-white/40" })}
          </motion.div>
        ))}
      </div>

      {/* 
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
          <motion.div
            className="w-1 h-3 bg-white/70 rounded-full mx-auto"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>Scroll Indicator */}
    </section>
  )
}

export default Hero