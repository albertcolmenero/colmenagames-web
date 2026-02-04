"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { MessageSquare, PenTool, Calendar, PartyPopper, RefreshCw } from 'lucide-react'

const Methodology = () => {
    const t = useTranslations('services.methodology')

    const steps = [
        {
            icon: MessageSquare,
            title: t('steps.0.title'),
            description: t('steps.0.description')
        },
        {
            icon: PenTool,
            title: t('steps.1.title'),
            description: t('steps.1.description')
        },
        {
            icon: Calendar,
            title: t('steps.2.title'),
            description: t('steps.2.description')
        },
        {
            icon: PartyPopper,
            title: t('steps.3.title'),
            description: t('steps.3.description')
        },
        {
            icon: RefreshCw,
            title: t('steps.4.title'),
            description: t('steps.4.description')
        }
    ]

    return (
        <div className="py-16 mt-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <h3 className="text-3xl font-bold text-foreground">
                    {t('title')}
                </h3>
            </motion.div>

            <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="flex flex-col items-center text-center group"
                        >
                            {/* Step Number Badge */}
                            <div className="mb-4 relative">
                                <motion.div
                                    className="w-24 h-24 rounded-full bg-white border-4 border-primary/10 flex items-center justify-center shadow-lg group-hover:border-primary/30 transition-colors duration-300"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <step.icon className="w-10 h-10 text-primary" />
                                </motion.div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
                                    {index + 1}
                                </div>
                            </div>

                            <h4 className="text-lg font-bold mb-2 text-foreground">
                                {step.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed px-2">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Methodology
