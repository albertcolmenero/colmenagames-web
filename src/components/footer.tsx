"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Instagram,
  ArrowUp
} from 'lucide-react'
import { LegalContent } from '@/components/legal-content'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('footer')
  const tHeader = useTranslations('header')
  
  const [activeDocument, setActiveDocument] = useState<string | null>(null)
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const footerLinks = {
    navegacion: [
      { name: tHeader('nav.home'), href: '#hero' },
      { name: tHeader('nav.about'), href: '#about' },
      { name: tHeader('nav.services'), href: '#services' },
      { name: tHeader('nav.whyUs'), href: '#why-us' },
      { name: tHeader('nav.contact'), href: '#contact' }
    ],
    servicios: [
      'Team-building Empresarial',
      'Esdeveniments Particulars',
      'Experiències Educatives',
      'Celebracions Familiars',
      'Dinàmiques Online',
      'Activitats Personalitzades'
    ],
    legal: [
      t('legal.legal'),
      t('legal.privacy'),
      t('legal.terms'),
      t('legal.cookies')
    ]
  }

  const socialLinks = [
    { icon: Instagram, name: 'Instagram', href: 'https://www.instagram.com/colmena_experience/', color: 'hover:text-pink-500' },
    /*{ icon: Linkedin, name: 'LinkedIn', href: '#', color: 'hover:text-blue-600' },
    { icon: Facebook, name: 'Facebook', href: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, name: 'Twitter', href: '#', color: 'hover:text-sky-500' }*/
  ]

  return (
    <footer className="bg-gradient-to-br from-foreground via-gray-900 to-gray-800 text-white overflow-hidden">
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Image
                src="/colmena-experience.png"
                alt="Colmena Experience"
                width={250}
                height={80}
                className="h-14 w-auto brightness-0 invert"
              />
            </motion.div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t('description')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div
                className="flex items-center space-x-3 text-gray-300 hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-primary" />
                <span>maria@bluelife-ventures.com</span>
              </motion.div>
              
              <motion.div
                className="flex items-center space-x-3 text-gray-300 hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>+34 623 286 976</span>
              </motion.div>
              
              <motion.div
                className="flex items-center space-x-3 text-gray-300 hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span>Barcelona, España</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold text-white mb-6">{t('quickLinks')}</h4>
            <div className="space-y-3">
              {footerLinks.navegacion.map((link, index) => (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-gray-300 hover:text-primary transition-colors text-left cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-white mb-6">Els nostres Serveis</h4>
            <div className="space-y-3">
              {footerLinks.servicios.map((service, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span>{service}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xl font-bold text-white mb-6">{t('contact')}</h4>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gray-300 ${social.color} transition-all duration-300 hover:bg-white/20 cursor-pointer`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {React.createElement(social.icon, { className: "w-5 h-5" })}
                </motion.a>
              ))}
            </div>

            {/*
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h5 className="font-semibold text-white mb-3">¿Quieres estar al día?</h5>
              <p className="text-gray-300 text-sm mb-4">
                Recibe noticias sobre nuevas experiencias y consejos para team-building.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary text-sm"
                />
                <motion.button
                  className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white text-sm font-medium transition-colors cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Suscribirse
                </motion.button>
              </div>
            </div> Newsletter Signup */}
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <motion.div
              className="flex items-center space-x-2 text-gray-400 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span>© 2025 Colmena Experience. {t('rights')}</span>
              <Heart className="w-4 h-4 text-primary" />
            </motion.div>

            {/* Legal Links */}
            <motion.div
              className="flex items-center space-x-6 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {footerLinks.legal.map((link, index) => {
                const documentType = link === 'Aviso Legal' 
                  ? 'aviso-legal'
                  : link === 'Política de Privacidad' 
                  ? 'politica-privacidad'
                  : link === 'Términos y Condiciones' 
                  ? 'terminos-condiciones'
                  : 'politica-cookies'
                
                return (
                  <button
                    key={index}
                    onClick={() => setActiveDocument(documentType)}
                    className="text-gray-400 hover:text-primary transition-colors cursor-pointer"
                  >
                    {link}
                  </button>
                )
              })}
            </motion.div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors group cursor-pointer"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <span className="text-sm">Volver arriba</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Floating Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 21.6, top: 73.4, duration: 5.2, delay: 0.4 },
          { left: 41.3, top: 96.6, duration: 4.8, delay: 1.3 },
          { left: 17.1, top: 87.2, duration: 5.7, delay: 0.8 },
          { left: 74.7, top: 59.2, duration: 4.3, delay: 1.7 },
          { left: 11.6, top: 63.0, duration: 5.9, delay: 0.2 },
          { left: 18.1, top: 92.6, duration: 4.6, delay: 1.1 },
          { left: 50.7, top: 96.5, duration: 5.4, delay: 0.6 },
          { left: 75.9, top: 45.3, duration: 4.9, delay: 1.5 },
          { left: 48.5, top: 17.5, duration: 5.1, delay: 0.9 },
          { left: 79.1, top: 10.9, duration: 4.7, delay: 1.9 }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${item.left}%`,
              top: `${item.top}%`,
            }}
            animate={{
              y: [-10, 10, -10],
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
      
      {/* Legal Content Modal */}
      <LegalContent 
        documentType={activeDocument}
        onClose={() => setActiveDocument(null)}
      />
    </footer>
  )
}

export default Footer