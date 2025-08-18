"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  Users, 
  Search, 
  BookOpen, 
  Music, 
  PartyPopper,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { useTranslations } from 'next-intl'

const Services = () => {
  const [activeService, setActiveService] = useState(0)
  const t = useTranslations('services')

  const services = [
    {
      id: 0,
      icon: Building2,
      title: t('corporate.title'),
      subtitle: t('corporate.subtitle'),
      description: t('corporate.description'),
      examples: [
        t('corporate.examples.0'),
        t('corporate.examples.1'),
        t('corporate.examples.2'),
        t('corporate.examples.3')
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 1,
      icon: Users,
      title: t('private.title'),
      subtitle: t('private.subtitle'),
      description: t('private.description'),
      examples: [
        t('private.examples.0'),
        t('private.examples.1'),
        t('private.examples.2'),
        t('private.examples.3')
      ],
      color: "from-primary to-accent",
      bgColor: "bg-orange-50"
    }
  ]

  const features = [
    t('features.list.0'),
    t('features.list.1'),
    t('features.list.2'),
    t('features.list.3'),
    t('features.list.4')
  ]

  return (
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-b from-white to-secondary/20">
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Service Cards */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-2xl border-2 ${
                    activeService === service.id 
                      ? 'border-primary shadow-xl scale-105' 
                      : 'border-transparent hover:border-primary/30'
                  }`}
                  onClick={() => setActiveService(service.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {React.createElement(service.icon, { className: "w-8 h-8 text-white" })}
                      </motion.div>
                      <div>
                        <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                        <CardDescription className="text-lg font-medium text-primary">
                          {service.subtitle}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <AnimatePresence>
                      {activeService === service.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-3 border-t pt-4 mt-4"
                        >
                          <h4 className="font-semibold text-foreground mb-3">{t('examples')}</h4>
                          {service.examples.map((example, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-center space-x-3"
                            >
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                              <span className="text-muted-foreground">{example}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Features & Visual */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            
            {/* Features List */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-primary/10">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {t('features.title')}
              </h3>
              
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive Visual */}
            <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 p-8 rounded-3xl overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t('specialMoments.title')}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('specialMoments.description')}
                </p>
                
                <Button 
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-full group cursor-pointer"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
{t('specialMoments.cta')}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Background Icons */}
              <div className="absolute inset-0 overflow-hidden">
                {[Search, BookOpen, Music, PartyPopper].map((Icon, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${20 + i * 25}%`,
                      top: `${30 + (i % 2) * 40}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [-5, 5, -5],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <Icon className="w-12 h-12 text-primary/20" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Services