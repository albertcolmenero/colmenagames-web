"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Sprout, Heart, Globe } from 'lucide-react'
import { useTranslations } from 'next-intl'

const MissionVision = () => {
  const t = useTranslations('mission')
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-secondary/30 to-white overflow-hidden">
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
{t('title')}{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Mission */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl border border-primary/10 relative overflow-hidden">
              
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Lightbulb className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  {t('mission.title')}
                  <span className="ml-3 text-2xl">💡</span>
                </h3>

                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {t('mission.description')}
                </motion.p>

                {/* Decorative Elements */}
                <div className="absolute bottom-4 left-4 opacity-10">
                  <Heart className="w-16 h-16 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-8 lg:p-12 rounded-3xl border-2 border-primary/20 relative overflow-hidden">
              
              {/* Background Pattern */}
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full" />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-3xl flex items-center justify-center mb-8 shadow-xl"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Sprout className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-3xl font-bold text-foreground mb-6 flex items-center">
                  {t('vision.title')}
                  <span className="ml-3 text-2xl">🌱</span>
                </h3>

                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {t('vision.description')}
                </motion.p>

                <motion.p
                  className="text-lg text-muted-foreground leading-relaxed mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  Aspiramos a que cada organización y cada grupo humano descubra el poder transformador 
                  del juego consciente y la gamificación aplicada.
                </motion.p>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Globe className="w-20 h-20 text-accent" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-12">
            {t('values.title')}
          </h3>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: t('values.connection.title'),
                description: t('values.connection.description'),
                emoji: t('values.connection.emoji')
              },
              {
                title: t('values.creativity.title'),
                description: t('values.creativity.description'),
                emoji: t('values.creativity.emoji')
              },
              {
                title: t('values.impact.title'),
                description: t('values.impact.description'),
                emoji: t('values.impact.emoji')
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/30 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.emoji}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {value.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Background Elements */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2">
          <motion.div
            className="w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="absolute right-1/3 top-1/4">
          <motion.div
            className="w-3 h-3 bg-accent/40 rounded-full"
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default MissionVision