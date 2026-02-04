"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Star, Puzzle, Handshake, Clock } from 'lucide-react'
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

const ForTeams = () => {
  const t = useTranslations('forTeams')
  const tWhyUs = useTranslations('whyUs')

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
  const benefits = [
    {
      icon: Sparkles,
      title: tWhyUs('benefits.methodology.title'),
      description: tWhyUs('benefits.methodology.description')
    },
    {
      icon: Zap,
      title: tWhyUs('benefits.guaranteed.title'),
      description: tWhyUs('benefits.guaranteed.description')
    },
    {
      icon: Users,
      title: tWhyUs('benefits.groupSize.title'),
      description: tWhyUs('benefits.groupSize.description')
    },
    {
      icon: Target,
      title: tWhyUs('benefits.adaptation.title'),
      description: tWhyUs('benefits.adaptation.description')
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

        <div className="flex flex-col items-center gap-8 max-w-3xl mx-auto">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/*<div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 text-white shadow-lg`}>
                {React.createElement(item.icon, { className: "w-6 h-6" })}
              </div>*/}
              <p className="text-2xl font-medium text-foreground leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-16">
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
      </div>
    </section>
  )
}

export default ForTeams
