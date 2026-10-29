import { useState, useEffect } from 'react'
import { Save, Key } from 'lucide-react'
import { useI18n } from '../i18n'

export default function Settings() {
  const { t, lang, setLang, languages } = useI18n()
  const [groqKey, setGroqKey] = useState('')
  const [keySaved, setKeySaved] = useState(false)
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    dealUpdates: true,
    taskReminders: false,
  })
  const [display, setDisplay] = useState({
    theme: 'dark',
    timezone: 'UTC+1',
  })

  useEffect(() => {
    const saved = localStorage.getItem('nexcrm_groq_key')
    if (saved) setGroqKey(saved)
  }, [])

  const handleSaveGroqKey = () => {
    localStorage.setItem('nexcrm_groq_key', groqKey)
    setKeySaved(true)
    setTimeout(() => setKeySaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">{t('settings.title')}</h1>
        <p className="text-gray-400 mt-2">{t('settings.subtitle')}</p>
      </div>

      <div className="space-y-6">

        {/* AI Configuration */}
        <div className="bg-navy-900 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <Key className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">{t('settings.aiTitle')}</h2>
            <span className="ml-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded">{t('nav.aiBadge')}</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">{t('settings.aiDesc')}</p>
          <div className="flex gap-2">
            <input
              type="password"
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              placeholder="gsk_..."
              className="flex-1 bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSaveGroqKey}
              className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {keySaved ? t('settings.saved') : t('settings.saveKey')}
            </button>
          </div>
          {groqKey && (
            <p className="text-green-400 text-xs mt-2">{t('settings.keySet')}</p>
          )}
          <p className="text-gray-500 text-xs mt-2">
            {t('settings.getKey')}{' '}
            <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              console.groq.com
            </a>
          </p>
        </div>

        {/* Notifications */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">{t('settings.notifications')}</h2>
          <div className="space-y-3">
            {[
              { key: 'emailAlerts' },
              { key: 'dealUpdates' },
              { key: 'taskReminders' },
            ].map(({ key }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                  className="w-4 h-4"
                />
                <span className="text-gray-300">{t(`settings.notifItems.${key}`)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Display */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">{t('settings.display')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('settings.theme')}</label>
              <select
                value={display.theme}
                onChange={(e) => setDisplay({...display, theme: e.target.value})}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="dark">{t('settings.themeDark')}</option>
                <option value="light">{t('settings.themeLight')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('settings.language')}</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white"
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>{language.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t('settings.timezone')}</label>
              <select
                value={display.timezone}
                onChange={(e) => setDisplay({...display, timezone: e.target.value})}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white"
              >
                <option>Europe/Berlin</option>
                <option>UTC</option>
                <option>UTC-5</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={() => alert(t('settings.savedAlert'))}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          <Save className="w-5 h-5" />
          {t('settings.save')}
        </button>
      </div>
    </div>
  )
}
