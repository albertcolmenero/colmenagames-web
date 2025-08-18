"use client"

import React from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'

import { Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const LanguageSelector = ({ isScrolled }: { isScrolled: boolean }) => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const languages = [
    { code: 'ca', name: 'CAT', flag: '🏴󠁥󠁳󠁣󠁴󠁿' },
    { code: 'es', name: 'ESP', flag: '🇪🇸' }
  ]

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center space-x-1">
      <Globe className={`w-4 h-4 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
      <div className="flex">
        {languages.map((lang) => (
          <motion.button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`px-2 py-1 text-sm font-medium transition-all duration-200 cursor-pointer ${
              locale === lang.code
                ? isScrolled
                  ? 'text-primary font-bold'
                  : 'text-yellow-300 font-bold'
                : isScrolled
                ? 'text-muted-foreground hover:text-primary'
                : 'text-white/80 hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {lang.name}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSelector
