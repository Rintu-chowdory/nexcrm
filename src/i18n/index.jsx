import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { translations, LANGUAGES, DEFAULT_LANGUAGE } from './translations'

const STORAGE_KEY = 'nexcrm_lang'
const LanguageContext = createContext(null)

const getByPath = (obj, path) =>
  path.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), obj)

const interpolate = (template, vars) => {
  if (typeof template !== 'string' || !vars) return template
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    Object.prototype.hasOwnProperty.call(vars, key) ? String(vars[key]) : match
  )
}

const readStoredLanguage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && translations[stored]) return stored
  } catch {
    /* localStorage can be unavailable (private mode, SSR) */
  }
  return DEFAULT_LANGUAGE
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(readStoredLanguage)

  const setLang = (next) => {
    if (!translations[next]) return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore write failures */
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const dict = translations[lang]
    const locale = dict.locale

    // t('deals.title') or t('pipeline.stageDeals', { count: 3 })
    const t = (path, vars) => {
      const found = getByPath(dict, path)
      if (found == null) {
        const fallback = getByPath(translations.en, path)
        return interpolate(fallback == null ? path : fallback, vars)
      }
      return interpolate(found, vars)
    }

    // Raw objects/arrays (e.g. t.raw('activities.items'))
    const raw = (path) => {
      const found = getByPath(dict, path)
      return found == null ? getByPath(translations.en, path) : found
    }

    const money = (amount, options = {}) =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: dict.currency,
        maximumFractionDigits: options.decimals ?? 0,
        minimumFractionDigits: options.decimals ?? 0,
      }).format(amount)

    const number = (value, options = {}) =>
      new Intl.NumberFormat(locale, { maximumFractionDigits: options.decimals ?? 0 }).format(value)

    // Compact money for column headers / kanban sums: $120k / 120 Tsd. €
    const moneyCompact = (amount) =>
      new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: dict.currency,
        notation: 'compact',
        maximumFractionDigits: 0,
      }).format(amount)

    const percent = (value) => new Intl.NumberFormat(locale, {
      style: 'percent',
      maximumFractionDigits: 0,
    }).format(value / 100)

    // '+12,5 %' / '+12.5%' – currency-style sign and decimal separator
    const signedPercent = (value) => new Intl.NumberFormat(locale, {
      style: 'percent',
      signDisplay: 'always',
      maximumFractionDigits: 1,
    }).format(value / 100)

    const date = (iso, options = { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }) =>
      new Date(`${iso}T00:00:00`).toLocaleDateString(locale, options)

    const shortDate = (iso) => date(iso, { month: 'short', day: 'numeric' })

    const monthShort = (isoOrDate) => {
      const d = typeof isoOrDate === 'string' && isoOrDate.length === 10
        ? new Date(`${isoOrDate}T00:00:00`)
        : new Date(isoOrDate)
      return d.toLocaleDateString(locale, { month: 'short' })
    }

    // 'HH:MM' (24h storage) rendered per locale: 14:30 / 2:30 PM
    const time = (hhmm) => {
      const [h, m] = hhmm.split(':').map(Number)
      const d = new Date()
      d.setHours(h, m, 0, 0)
      return d.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' })
    }

    return { lang, setLang, t, raw, money, moneyCompact, number, percent, signedPercent, date, shortDate, monthShort, time, locale, languages: LANGUAGES }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useI18n = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>')
  return ctx
}
