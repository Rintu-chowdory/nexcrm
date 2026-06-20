import { useState, useEffect } from 'react'
import { Save, Key } from 'lucide-react'

export default function Settings() {
  const [groqKey, setGroqKey] = useState('')
  const [keySaved, setKeySaved] = useState(false)
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    dealUpdates: true,
    taskReminders: false,
  })
  const [display, setDisplay] = useState({
    theme: 'dark',
    language: 'English',
    timezone: 'UTC-5',
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
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-2">Manage your account preferences and configurations</p>
      </div>

      <div className="space-y-6">

        {/* AI Configuration */}
        <div className="bg-navy-900 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-1">
            <Key className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">AI Configuration</h2>
            <span className="ml-2 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded">AI</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Add your Groq API key to enable the AI Email Composer</p>
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
              {keySaved ? 'Saved ✓' : 'Save Key'}
            </button>
          </div>
          {groqKey && (
            <p className="text-green-400 text-xs mt-2">✓ API key is set — AI Composer is ready</p>
          )}
          <p className="text-gray-500 text-xs mt-2">
            Get a free key at{' '}
            <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              console.groq.com
            </a>
          </p>
        </div>

        {/* Notifications */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Notifications</h2>
          <div className="space-y-3">
            {[
              { key: 'emailAlerts', label: 'Email alerts for new leads' },
              { key: 'dealUpdates', label: 'Deal stage update notifications' },
              { key: 'taskReminders', label: 'Task reminder emails' },
            ].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[key]}
                  onChange={(e) => setNotifications({...notifications, [key]: e.target.checked})}
                  className="w-4 h-4"
                />
                <span className="text-gray-300">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Display */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Display</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
              <select
                value={display.theme}
                onChange={(e) => setDisplay({...display, theme: e.target.value})}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
              <select
                value={display.language}
                onChange={(e) => setDisplay({...display, language: e.target.value})}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
              <select
                value={display.timezone}
                onChange={(e) => setDisplay({...display, timezone: e.target.value})}
                className="w-full bg-navy-800 border border-navy-600 rounded-lg px-3 py-2 text-white"
              >
                <option>UTC-5</option>
                <option>UTC</option>
                <option>UTC+1</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={() => alert('Settings saved!')}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </div>
    </div>
  )
}
