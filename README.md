# NexCRM

Customer relationship management SPA built with React 18, Vite and Tailwind CSS.
German and English UI with locale aware formatting (currency, dates, times).

## Features

- **Dashboard** – KPI cards, revenue trend chart, pipeline summary, activity feed
- **Contacts** – searchable, filterable contact table
- **Pipeline** – drag & drop kanban board across four stages
- **Deals** – sortable deal table with value/stage/probability stats
- **Activities** – timeline of calls, emails and meetings grouped by day
- **AI Composer** – generates sales emails with the Groq API (bring your own key)
- **Datenschutz / Impressum** – German legal pages

## Languages

The UI ships in **German (default) and English**. Switch languages with the
`DE` / `EN` toggle at the bottom of the sidebar or under *Settings → Display →
Language*. The choice is stored in `localStorage` (`nexcrm_lang`) and applied to
`<html lang>`.

Localisation is handled in `src/i18n/`:

```
src/i18n/translations.js   # every UI string, one block per language
src/i18n/index.jsx         # LanguageProvider, useI18n() hook, formatters
```

Usage in a component:

```jsx
import { useI18n } from '../i18n'

const { t, raw, money, moneyCompact, number, percent, signedPercent, date, shortDate, monthShort, time } = useI18n()

t('deals.title')                        // "Deals" / "Deals"
t('pipeline.stageDeals', { count: 3 })  // "3 Deals"
raw('activities.items')                 // arrays/objects of copy
money(95000)                            // "95.000 €" / "$95,000"
percent(75)                             // "75 %" / "75%"
date('2026-06-10')                      // "Mittwoch, 10. Juni 2026" / "Wednesday, Jun 10, 2026"
time('14:30')                           // "14:30" / "2:30 PM"
```

Formatting follows the active language: `de-DE` with EUR and comma decimals,
`en-US` with USD. The AI composer also asks the model to answer in the active
language.

### Adding a language

1. Copy the `en` block in `src/i18n/translations.js`, translate the values.
2. Add the code to `LANGUAGES` (and set `locale` / `currency` in the new block).

Missing keys fall back to English automatically.

## Development

```bash
npm install
npm run dev      # http://localhost:5173/nexcrm/
npm run build    # production build in dist/
npm run preview
```

The Vite base path defaults to `/nexcrm/` for GitHub Pages and is overridden
with `VITE_BASE=/` on Vercel.

## Deployment

- **Vercel** – `.github/workflows/vercel-deploy.yml` deploys to production on
  every push to `main` (and preview builds for pull requests). Live at
  <https://nexcrm-alpha.vercel.app>
- **GitHub Pages** – `.github/workflows/deploy.yml` publishes `dist/`

## AI Composer

Open *Settings*, paste a free Groq API key from
<https://console.groq.com>, and save it. The key is stored in `localStorage`
only and never leaves the browser except to call the Groq API directly.
