import { Link, useLocation } from "react-router-dom"
import { BarChart3, Users, Zap, Briefcase, Clock, Settings, Sparkles, Shield } from "lucide-react"

const Sidebar = () => {
  const location = useLocation()

  const navItems = [
    { path: "/", icon: BarChart3, label: "Dashboard" },
    { path: "/contacts", icon: Users, label: "Contacts" },
    { path: "/pipeline", icon: Zap, label: "Pipeline" },
    { path: "/deals", icon: Briefcase, label: "Deals" },
    { path: "/activities", icon: Clock, label: "Activities" },
    { path: "/ai-composer", icon: Sparkles, label: "AI Composer" },
    { path: "/settings", icon: Settings, label: "Settings" },
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
        <p className="text-sm text-gray-400">Customer Relations</p>
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
                  {item.label === "AI Composer" && (
                    <span className="ml-auto text-xs bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">AI</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

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
          <span>Datenschutz</span>
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
          <span>Impressum</span>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar