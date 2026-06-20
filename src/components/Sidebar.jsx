import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Kanban, Briefcase, Activity, Settings } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/contacts', label: 'Contacts', icon: Users },
    { path: '/pipeline', label: 'Pipeline', icon: Kanban },
    { path: '/deals', label: 'Deals', icon: Briefcase },
    { path: '/activities', label: 'Activities', icon: Activity },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-navy-light border-r border-blue-accent/20 p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-accent">NexCRM</h1>
        <p className="text-gray-400 text-sm">Sales Management</p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-accent text-white'
                  : 'text-gray-300 hover:text-white hover:bg-navy'
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-blue-accent/20 pt-4">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full bg-blue-accent flex items-center justify-center">
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <p className="text-sm font-semibold">Alice Johnson</p>
            <p className="text-xs text-gray-400">Sales Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
