import React, { useState } from 'react'
import { Sparkles, Copy, CheckCheck, AlertCircle } from 'lucide-react'

const CONTACTS = ['Sarah Johnson', 'Mike Chen', 'Emily Rodriguez', 'David Kim', 'Lisa Wang']
const EMAIL_TYPES = ['Cold Outreach', 'Follow-up', 'Deal Proposal', 'Re-engagement']
const TONES = ['Professional', 'Friendly', 'Urgent', 'Casual']

export default function AIComposer() {
  const [contact, setContact] = useState(CONTACTS[0])
  const [emailType, setEmailType] = useState(EMAIL_TYPES[0])
  const [tone, setTone] = useState(TONES[0])
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  const apiKey = localStorage.getItem('nexcrm_groq_key')

  const generate = async () => {
    if (!apiKey) { setError('Add your Groq API key in Settings first.'); return }
    setLoading(true); setError(''); setResult('')
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: 'You are an expert sales email writer. Write concise, personalized sales emails.' },
            { role: 'user', content: `Write a ${tone.toLowerCase()} ${emailType.toLowerCase()} email to ${contact}. Keep it under 150 words.` }
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
        <h1 className="text-2xl font-bold text-white">AI Email Composer</h1>
      </div>
      {!apiKey && (
        <div className="flex items-center gap-2 p-3 mb-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Add your Groq API key in Settings to use AI features
        </div>
      )}
      <div className="space-y-4 bg-slate-800 rounded-xl p-5">
        <div>
          <label className="text-sm text-slate-400 mb-1 block">Contact</label>
          <select value={contact} onChange={e => setContact(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-blue-500">
            {CONTACTS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">Email Type</label>
          <select value={emailType} onChange={e => setEmailType(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg px-3 py-2 border border-slate-600 focus:outline-none focus:border-blue-500">
            {EMAIL_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-1 block">Tone</label>
          <div className="flex gap-2 flex-wrap">
            {TONES.map(t => (
              <button key={t} onClick={() => setTone(t)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${tone === t ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{t}</button>
            ))}
          </div>
        </div>
        <button onClick={generate} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg py-2.5 font-medium flex items-center justify-center gap-2 transition-colors">
          <Sparkles className="w-4 h-4" />
          {loading ? 'Generating...' : 'Generate Email'}
        </button>
      </div>
      {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      {result && (
        <div className="mt-4 bg-slate-800 rounded-xl p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-400">Generated Email</span>
            <button onClick={copy} className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300">
              {copied ? <><CheckCheck className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
          </div>
          <textarea value={result} onChange={e => setResult(e.target.value)} className="w-full bg-slate-700 text-white rounded-lg p-3 border border-slate-600 focus:outline-none focus:border-blue-500 resize-none" rows={10} />
        </div>
      )}
    </div>
  )
}
