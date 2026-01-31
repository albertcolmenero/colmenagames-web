"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Puzzle, Handshake, Clock } from 'lucide-react'
import { useTranslations } from 'next-intl'

const ForTeams = () => {
  const t = useTranslations('forTeams')
  
  const items = [
    {
      icon: Star,
      text: t('items.0'),
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Puzzle,
      text: t('items.1'),
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Handshake,
      text: t('items.2'),
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Clock,
      text: t('items.3'),
      color: "from-purple-400 to-pink-500"
    }
  ]

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t('title')}
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-card border border-border/50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {React.createElement(item.icon, { className: "w-6 h-6" })}
              </div>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ForTeams
