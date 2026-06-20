import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, Briefcase, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const Dashboard = () => {
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$487,245',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      bgColor: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
    },
    {
      title: 'Active Deals',
      value: '42',
      change: '+5.2%',
      trend: 'up',
      icon: Briefcase,
      bgColor: 'bg-gradient-to-br from-blue-600 to-blue-800',
    },
    {
      title: 'Total Contacts',
      value: '1,234',
      change: '+8.1%',
      trend: 'up',
      icon: Users,
      bgColor: 'bg-gradient-to-br from-purple-600 to-purple-800',
    },
    {
      title: 'Win Rate',
      value: '68%',
      change: '-2.3%',
      trend: 'down',
      icon: TrendingUp,
      bgColor: 'bg-gradient-to-br from-orange-600 to-orange-800',
    },
  ]

  const chartData = [
    { month: 'Jan', revenue: 42000, deals: 24 },
    { month: 'Feb', revenue: 35000, deals: 18 },
    { month: 'Mar', revenue: 48000, deals: 32 },
    { month: 'Apr', revenue: 52000, deals: 28 },
    { month: 'May', revenue: 61000, deals: 35 },
    { month: 'Jun', revenue: 55000, deals: 30 },
  ]

  const activities = [
    { id: 1, type: 'deal', title: 'Deal closed with Acme Corp', time: '2 hours ago', user: 'Sarah Chen' },
    { id: 2, type: 'contact', title: 'New contact added: Mike Johnson', time: '4 hours ago', user: 'John Doe' },
    { id: 3, type: 'call', title: 'Call completed with TechStart Inc', time: '6 hours ago', user: 'Emma Wilson' },
    { id: 4, type: 'email', title: 'Email sent to prospective client', time: '8 hours ago', user: 'Alex Kumar' },
  ]

  const KPICard = ({ title, value, change, trend, icon: Icon, bgColor }) => (
    <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-white mb-3">{value}</p>
          <div className="flex items-center gap-1">
            {trend === 'up' ? (
              <ArrowUpRight className="w-4 h-4 text-green-500" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-500" />
            )}
            <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
              {change}
            </span>
          </div>
        </div>
        <div className={`${bgColor} p-4 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="p-8 bg-navy-900 min-h-screen">
      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's your business overview.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-navy-800 border border-blue-900 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
                <XAxis stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a202c',
                    border: '1px solid #1e40af',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Pipeline Summary</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Prospecting</span>
                  <span className="text-white font-semibold">8</span>
                </div>
                <div className="w-full bg-navy-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Qualification</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="w-full bg-navy-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Negotiation</span>
                  <span className="text-white font-semibold">15</span>
                </div>
                <div className="w-full bg-navy-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Closed</span>
                  <span className="text-white font-semibold">7</span>
                </div>
                <div className="w-full bg-navy-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-blue-900 last:border-b-0">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-white">{activity.user.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-400">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
