import React, { useState } from 'react'
import { Sparkles, Copy, CheckCheck, AlertCircle } from 'lucide-react'
import { useI18n } from '../i18n'

const CONTACTS = ['Sarah Johnson', 'Mike Chen', 'Emily Rodriguez', 'David Kim', 'Lisa Wang']

// Keys stay stable across languages; the prompt always uses English terms so
// the model gets consistent instructions, the UI shows the localised labels.
const EMAIL_TYPES = {
  cold: 'cold outreach',
  followUp: 'follow-up',
  proposal: 'deal proposal',
  reengagement: 're-engagement',
}

const TONES = {
  professional: 'professional',
  friendly: 'friendly',
  urgent: 'urgent',
  casual: 'casual',
}

export default function AIComposer() {
  const { t } = useI18n()
  const [contact, setContact] = useState(CONTACTS[0])
  const [emailType, setEmailType] = useState('cold')
  const [tone, setTone] = useState('professional')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const apiKey = localStorage.getItem('nexcrm_groq_key')

  const generate = async () => {
    if (!apiKey) { setError(t('composer.noKey')); return }
    setLoading(true); setError(''); setResult('')
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'qwen/qwen3.8-27b',
          messages: [
            { role: 'system', content: 'You are an expert sales email writer. Write concise, personalized sales emails.' },
            { role: 'user', content: `Write a ${TONES[tone]} ${EMAIL_TYPES[emailType]} email to ${contact}. Keep it under 150 words. ${t('composer.promptLanguage')}` }
          ],
          max_tokens: 400
        })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error.message)
      setResult(data.choices[0].message.content)
    } catch (e) { setError(e.message) }
    setLoading(false)
  }

  const copy = () => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-6 h-6 text-blue-400" />
        <h1 className="text-2xl font-bold text-white">{t('composer.title')}</h1>
      </div>
      {!apiKey && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {t('composer.warning')}
        </div>
      )}
      <div className="space-y-4 bg-slate-800 rounded-xl p-5">
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{t('composer.contact')}</label>
          <select value={contact} onChange={e => setContact(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-blue-500">
            {CONTACTS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{t('composer.emailType')}</label>
          <select value={emailType} onChange={e => setEmailType(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-blue-500">
            {Object.keys(EMAIL_TYPES).map(key => <option key={key} value={key}>{t(`composer.types.${key}`)}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">{t('composer.tone')}</label>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(TONES).map(key => (
              <button key={key} onClick={() => setTone(key)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tone === key ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{t(`composer.tones.${key}`)}</button>
            ))}
          </div>
        </div>
        <button onClick={generate} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg py-2.5 font-medium flex items-center justify-center gap-2 transition-colors">
          <Sparkles className="w-4 h-4" />
          {loading ? t('composer.generating') : t('composer.generate')}
        </button>
      </div>
      {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      {result && (
        <div className="mt-4 bg-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-400">{t('composer.generatedEmail')}</span>
            <button onClick={copy} className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
              {copied ? <><CheckCheck className="w-4 h-4" /> {t('composer.copied')}</> : <><Copy className="w-4 h-4" /> {t('composer.copy')}</>}
            </button>
          </div>
          <textarea value={result} onChange={e => setResult(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:outline-none focus:border-blue-500 resize-none" rows={10} />
        </div>
      )}
    </div>
  )
}
