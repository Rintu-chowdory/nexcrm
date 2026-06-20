import { Link, useLocation } from 'react-router-dom'
import { BarChart3, Users, Zap, Briefcase, Clock, Settings, Zap as Logo } from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard' },
    { path: '/contacts', icon: Users, label: 'Contacts' },
    { path: '/pipeline', icon: Zap, label: 'Pipeline' },
    { path: '/deals', icon: Briefcase, label: 'Deals' },
    { path: '/activities', icon: Clock, label: 'Activities' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="w-64 bg-navy-950 border-r border-blue-900 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-blue-900">
        <div className="flex items-center gap-2 mb-2">
          <Logo className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold text-white">NexCRM</span>
        </div>
        <p className="text-sm text-gray-400">Customer Relations</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-navy-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-blue-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-sm font-bold">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
