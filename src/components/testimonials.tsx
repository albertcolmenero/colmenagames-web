"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, Star, ChevronLeft, ChevronRight, Building2, Users, Heart } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = useTranslations('testimonials')

  const testimonials = [
    {
      id: 1,
      name: t('clients.maria.name'),
      role: t('clients.maria.role'),
      company: t('clients.maria.company'),
      type: "empresa",
      icon: Building2,
      testimonial: t('clients.maria.testimonial'),
      rating: 5,
      image: "👩‍💼"
    },
    {
      id: 2,
      name: t('clients.carlos.name'),
      role: t('clients.carlos.role'),
      company: t('clients.carlos.company'),
      type: "particular",
      icon: Heart,
      testimonial: t('clients.carlos.testimonial'),
      rating: 5,
      image: "🎩"
    },
    {
      id: 3,
      name: t('clients.ana.name'),
      role: t('clients.ana.role'),
      company: t('clients.ana.company'),
      type: "educativo",
      icon: Users,
      testimonial: t('clients.ana.testimonial'),
      rating: 5,
      image: "👩‍🏫"
    },
    {
      id: 4,
      name: t('clients.roberto.name'),
      role: t('clients.roberto.role'),
      company: t('clients.roberto.company'),
      type: "empresa",
      icon: Building2,
      testimonial: t('clients.roberto.testimonial'),
      rating: 5,
      image: "👨‍💻"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'empresa':
        return 'from-blue-500 to-blue-600'
      case 'particular':
        return 'from-primary to-accent'
      case 'educativo':
        return 'from-green-500 to-green-600'
      default:
        return 'from-primary to-accent'
    }
  }

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-secondary/30 via-white to-primary/5 overflow-hidden">
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
            {t('title')}
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

        {/* Main Testimonial Display */}
        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                <CardContent className="p-8 lg:p-12">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">

                    {/* Quote and Content */}
                    <div className="lg:col-span-2">
                      {/* Quote Icon */}
                      <motion.div
                        className="mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      >
                        <Quote className="w-16 h-16 text-primary/30" />
                      </motion.div>

                      {/* Testimonial Text */}
                      <motion.p
                        className="text-xl lg:text-2xl text-foreground leading-relaxed mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        &ldquo;{testimonials[currentIndex].testimonial}&rdquo;
                      </motion.p>

                      {/* Rating */}
                      <motion.div
                        className="flex space-x-1 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                          >
                            <Star className="w-6 h-6 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Client Info */}
                    <motion.div
                      className="text-center lg:text-left"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {/* Avatar */}
                      <div className="w-24 h-24 mx-auto lg:mx-0 mb-4 text-6xl flex items-center justify-center bg-gradient-to-br from-secondary to-primary/20 rounded-full">
                        {testimonials[currentIndex].image}
                      </div>

                      {/* Name and Role */}
                      <h4 className="text-2xl font-bold text-foreground mb-2">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-lg text-muted-foreground mb-2">
                        {testimonials[currentIndex].role}
                      </p>
                      <p className="text-primary font-semibold mb-4">
                        {testimonials[currentIndex].company}
                      </p>

                      {/* Type Badge */}
                      <motion.div
                        className={`inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${getTypeColor(testimonials[currentIndex].type)} text-white rounded-full text-sm font-semibold`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {React.createElement(testimonials[currentIndex].icon, { className: "w-4 h-4" })}
                        <span className="capitalize">{testimonials[currentIndex].type}</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-primary/30 hover:bg-primary/60'
                    }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 group cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            </motion.button>
          </div>
        </div>


        {/* Background Decorative Elements */}
        <div className="absolute left-0 top-1/3 -translate-x-1/2">
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
      </div>
    </section>
  )
}

export default Testimonials