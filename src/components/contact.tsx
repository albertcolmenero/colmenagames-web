"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  CheckCircle,
  Clock
} from 'lucide-react'
import { useTranslations } from 'next-intl'

const Contact = () => {
  const t = useTranslations('contact')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    groupType: '',
    participants: '',
    date: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsSubmitting(true)
    setError('')

    try {
      // Format message with all form data
      const formattedMessage = `
${t('email.subject')}

${t('email.contactData')}
• ${t('email.name')} ${formData.name}
• ${t('email.email')} ${formData.email}
• ${t('email.phone')} ${formData.phone || t('email.notProvided')}

${t('email.groupInfo')}
• ${t('email.groupType')} ${formData.groupType || t('email.notSpecified')}
• ${t('email.participants')} ${formData.participants || t('email.notSpecified')}
• ${t('email.date')} ${formData.date || t('email.notSpecified')}

${t('email.additionalMessage')}
${formData.message || t('email.noAdditionalMessage')}
      `.trim()

      // Send to Formcarry
      const response = await fetch("https://formcarry.com/s/emyGEYl2TiY", {
        method: 'POST',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formattedMessage,
          phone: formData.phone,
          groupType: formData.groupType,
          participants: formData.participants,
          date: formData.date
        })
      })

      const result = await response.json()

      if (result.code === 200) {
        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: '',
            email: '',
            phone: '',
            groupType: '',
            participants: '',
            date: '',
            message: ''
          })
        }, 5000)
      } else if (result.code === 422) {
        // Field validation failed
        setError(result.message)
        setIsSubmitting(false)
      } else {
        // Other error from formcarry
        setError(result.message)
        setIsSubmitting(false)
      }

    } catch (error) {
      // Request related error
      console.error('Error sending form:', error)
      setError(error instanceof Error ? error.message : t('email.errorSending'))
      setIsSubmitting(false)
    }
  }

  const groupTypes = [
    { value: "corporate", label: t('form.groupTypes.corporate') },
    { value: "educational", label: t('form.groupTypes.educational') },
    { value: "family", label: t('form.groupTypes.family') },
    { value: "association", label: t('form.groupTypes.association') },
    { value: "other", label: t('form.groupTypes.other') }
  ]

  const contactInfo = [
    {
      icon: Mail,
      title: t('info.email'),
      value: "hola@colmena-experience.com",
      description: t('info.responseValue')
    },
    {
      icon: Phone,
      title: t('info.phone'),
      value: "+34 623 286 976",
      description: t('info.hoursValue')
    },
    {
      icon: MapPin,
      title: t('info.location'),
      value: t('info.location'),
      description: t('info.coverage')
    }
  ]

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-white via-secondary/20 to-primary/10 overflow-hidden">
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

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-white shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-accent p-8">
                <CardTitle className="text-3xl font-bold text-white flex items-center">
                  <span className="mr-3">👉</span>
                  {t('form.title')}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          {t('form.name')} *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t('form.namePlaceholder')}
                          required
                          className="border-2 border-primary/20 focus:border-primary"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          {t('form.email')} *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t('form.emailPlaceholder')}
                          required
                          className="border-2 border-primary/20 focus:border-primary"
                        />
                      </motion.div>
                    </div>

                    {/* Phone and Group Type Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          {t('form.phone')}
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t('form.phonePlaceholder')}
                          className="border-2 border-primary/20 focus:border-primary"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          {t('form.groupType')}
                        </label>
                        <select
                          name="groupType"
                          value={formData.groupType}
                          onChange={handleInputChange}
                          className="w-full h-10 px-3 py-2 border-2 border-primary/20 rounded-md focus:border-primary focus:outline-none bg-background"
                        >
                          <option value="">{t('form.groupTypePlaceholder')}</option>
                          {groupTypes.map((type, index) => (
                            <option key={index} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </motion.div>
                    </div>

                    {/* Participants and Date Row */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          {t('form.participants')}
                        </label>
                        <Input
                          name="participants"
                          value={formData.participants}
                          onChange={handleInputChange}
                          placeholder={t('form.participantsPlaceholder')}
                          className="border-2 border-primary/20 focus:border-primary"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                      >
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          {t('form.date')}
                        </label>
                        <Input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="border-2 border-primary/20 focus:border-primary"
                        />
                      </motion.div>
                    </div>

                    {/* Message */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        {t('form.message')}
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('form.messagePlaceholder')}
                        rows={4}
                        className="border-2 border-primary/20 focus:border-primary resize-none"
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            {t('form.submitting')}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            {t('form.submit')}
                          </div>
                        )}
                      </Button>
                    </motion.div>

                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4">
                        <p className="text-sm">{error}</p>
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      * {t('form.responseMessage')}
                    </p>
                  </form>
                ) : (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-10 h-10 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      {t('form.success')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('form.successMessage')}
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Additional Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/10 hover:border-primary/30"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  whileHover={{ y: -2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                    {React.createElement(info.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{info.title}</h4>
                    <p className="text-lg font-semibold text-primary mb-1">{info.value}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Process Info */}
            <motion.div
              className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-8 rounded-3xl border border-primary/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <Clock className="mr-3 w-8 h-8 text-primary" />
                {t('process.title')}
              </h3>

              <div className="space-y-4">
                {[
                  t('process.steps.0'),
                  t('process.steps.1'),
                  t('process.steps.2'),
                  t('process.steps.3'),
                  t('process.steps.4')
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pricing Info */}
            <motion.div
              className="bg-white p-8 rounded-3xl shadow-lg border border-primary/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center">
                <Sparkles className="mr-3 w-8 h-8 text-accent" />
                {t('pricing.title')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('pricing.description')}
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• <strong>{t('pricing.basic')}</strong></div>
                <div>• <strong>{t('pricing.premium')}</strong></div>
                <div>• <strong>{t('pricing.custom')}</strong></div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                {t('pricing.disclaimer')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact