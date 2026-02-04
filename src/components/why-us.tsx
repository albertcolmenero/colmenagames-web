"use client"

import React from 'react'
import Image from 'next/image'
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
            {t('subtitle')}
          </motion.p>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          className="relative w-full h-[300px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-20 group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src="/colmena-experience-why-us-testimonials.png"
            alt="Colmena Games Experience"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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



        {/* Call to Action */}


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