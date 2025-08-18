"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Play, Users, Sparkles, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const t = useTranslations('hero')
  
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
          {[
            { left: 5.2, top: 14.4, duration: 6, delay: 0.2 },
            { left: 87.2, top: 28.3, duration: 7, delay: 1.5 },
            { left: 9.6, top: 89.2, duration: 5.5, delay: 0.8 },
            { left: 43.3, top: 89.8, duration: 8, delay: 1.2 },
            { left: 77.3, top: 3.7, duration: 6.5, delay: 0.5 },
            { left: 58.7, top: 67.1, duration: 7.5, delay: 1.8 },
            { left: 5.0, top: 67.1, duration: 5, delay: 0.3 },
            { left: 79.9, top: 14.2, duration: 6.8, delay: 1.0 },
            { left: 66.1, top: 41.5, duration: 7.2, delay: 1.6 },
            { left: 37.5, top: 44.6, duration: 5.8, delay: 0.7 },
            { left: 93.6, top: 9.1, duration: 6.2, delay: 1.3 },
            { left: 76.2, top: 53.0, duration: 7.8, delay: 0.9 },
            { left: 71.2, top: 66.0, duration: 5.3, delay: 1.7 },
            { left: 48.3, top: 28.8, duration: 6.7, delay: 0.4 },
            { left: 35.6, top: 60.8, duration: 7.1, delay: 1.4 },
            { left: 48.3, top: 9.5, duration: 5.9, delay: 0.6 },
            { left: 85.2, top: 95.8, duration: 6.4, delay: 1.1 },
            { left: 31.3, top: 37.7, duration: 7.6, delay: 1.9 },
            { left: 49.5, top: 82.2, duration: 5.7, delay: 0.1 },
            { left: 52.0, top: 46.9, duration: 6.9, delay: 1.5 }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-white/10 rounded-sm"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
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
{t('title.play')}
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
{t('title.connect')}
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-white bg-clip-text text-transparent"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
{t('title.transform')}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
{t('subtitle')}{' '}
            <span className="font-semibold text-yellow-300">{t('highlight')}</span>
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
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group cursor-pointer"
              size="lg"
            >
              <span className="mr-2">👉</span>
{t('cta.primary')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={() => scrollToSection('#about')}
              variant="outline"
              className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group cursor-pointer"
              size="lg"
            >
{t('cta.secondary')}
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
              <div className="text-white/80 font-medium">{t('stats.people')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80 font-medium">{t('stats.customizable')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-white/80 font-medium">{t('stats.possibilities')}</div>
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