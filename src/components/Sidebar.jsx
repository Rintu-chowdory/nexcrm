import { Link, useLocation } from "react-router-dom"
import { BarChart3, Users, Zap, Briefcase, Clock, Settings, Sparkles, Shield, Languages } from "lucide-react"
import { useI18n } from "../i18n"

const Sidebar = () => {
  const location = useLocation()
  const { t, lang, setLang, languages } = useI18n()

  const navItems = [
    { path: "/", icon: BarChart3, label: t("nav.dashboard"), key: "dashboard" },
    { path: "/contacts", icon: Users, label: t("nav.contacts"), key: "contacts" },
    { path: "/pipeline", icon: Zap, label: t("nav.pipeline"), key: "pipeline" },
    { path: "/deals", icon: Briefcase, label: t("nav.deals"), key: "deals" },
    { path: "/activities", icon: Clock, label: t("nav.activities"), key: "activities" },
    { path: "/ai-composer", icon: Sparkles, label: t("nav.composer"), key: "composer" },
    { path: "/settings", icon: Settings, label: t("nav.settings"), key: "settings" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="w-64 bg-navy-950 border-r border-blue-900 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-blue-900">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold text-white">NexCRM</span>
        </div>
        <p className="text-sm text-gray-400">{t("nav.tagline")}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-blue-900/30"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.key === "composer" && (
                    <span className="ml-auto text-xs bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">{t("nav.aiBadge")}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Language switcher */}
      <div className="border-t border-blue-900 px-4 py-4">
        <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
          <Languages className="w-4 h-4" />
          <span>{t("nav.languageLabel")}</span>
        </div>
        <div className="flex gap-2" role="group" aria-label={t("nav.languageLabel")}>
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              onClick={() => setLang(language.code)}
              aria-pressed={lang === language.code}
              title={language.label}
              className={`flex-1 px-2 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                lang === language.code
                  ? "bg-blue-600 text-white"
                  : "bg-navy-800 text-gray-400 hover:text-white hover:bg-blue-900/40"
              }`}
            >
              {language.short}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-blue-900 px-4 py-4 space-y-2">
        <Link
          to="/datenschutz"
          className={`flex items-center gap-2 text-xs transition-colors ${
            isActive("/datenschutz")
              ? "text-blue-400"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>{t("nav.privacy")}</span>
        </Link>
        <Link
          to="/impressum"
          className={`flex items-center gap-2 text-xs transition-colors ${
            isActive("/impressum")
              ? "text-blue-400"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>{t("nav.imprint")}</span>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
