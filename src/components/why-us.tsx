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
import { useTranslations } from 'next-intl'

const WhyUs = () => {
  const t = useTranslations('whyUs')
  
  const benefits = [
    {
      icon: CheckCircle2,
      title: t('benefits.readyToUse.title'),
      description: t('benefits.readyToUse.description')
    },
    {
      icon: Globe,
      title: t('benefits.onlineOffline.title'),
      description: t('benefits.onlineOffline.description')
    },
    {
      icon: Sparkles,
      title: t('benefits.methodology.title'),
      description: t('benefits.methodology.description')
    },
    {
      icon: Zap,
      title: t('benefits.guaranteed.title'),
      description: t('benefits.guaranteed.description')
    },
    {
      icon: Users,
      title: t('benefits.groupSize.title'),
      description: t('benefits.groupSize.description')
    },
    {
      icon: Target,
      title: t('benefits.adaptation.title'),
      description: t('benefits.adaptation.description')
    }
  ]

  const stats = [
    { number: "100%", label: t('stats.satisfaction'), icon: Heart },
    { number: "350+", label: t('stats.projects'), icon: Sparkles },
    { number: "5000+", label: t('stats.participants'), icon: Users },
    { number: "95%", label: t('stats.repeatClients'), icon: Award }
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
{t('title')}{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('titleHighlight')}
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
              {[
                { left: 30.3, top: 70.6, duration: 4.2, delay: 0.3 },
                { left: 50.6, top: 26.1, duration: 5.1, delay: 1.2 },
                { left: 62.4, top: 65.1, duration: 3.8, delay: 0.7 },
                { left: 35.2, top: 60.1, duration: 4.7, delay: 1.6 },
                { left: 6.3, top: 67.4, duration: 3.5, delay: 0.1 },
                { left: 86.5, top: 46.3, duration: 4.9, delay: 1.4 },
                { left: 87.8, top: 26.9, duration: 3.2, delay: 0.9 },
                { left: 57.7, top: 12.7, duration: 5.3, delay: 1.8 },
                { left: 45.2, top: 43.6, duration: 4.1, delay: 0.5 },
                { left: 18.4, top: 85.9, duration: 4.6, delay: 1.0 },
                { left: 56.8, top: 40.1, duration: 3.9, delay: 1.5 },
                { left: 69.9, top: 17.2, duration: 4.4, delay: 0.2 },
                { left: 29.3, top: 71.5, duration: 5.0, delay: 1.3 },
                { left: 10.3, top: 12.5, duration: 3.7, delay: 0.8 },
                { left: 46.6, top: 48.7, duration: 4.8, delay: 1.7 }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-white rounded-sm"
                  style={{
                    left: `${item.left}%`,
                    top: `${item.top}%`,
                  }}
                  animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 180, 360],
                    opacity: [0.1, 0.3, 0.1],
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

            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                {t('ctaTitle')}
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                {t('subtitle')}
              </p>
              
              <motion.button
                className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center space-x-2 cursor-pointer"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{t('cta')}</span>
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