import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Users, Briefcase, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useI18n } from '../i18n'

const Dashboard = () => {
  const { t, raw, money, moneyCompact, number, percent, signedPercent, monthShort } = useI18n()

  const kpiData = [
    {
      title: t('dashboard.kpi.revenue'),
      value: money(487245),
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      bgColor: 'bg-gradient-to-br from-emerald-600 to-emerald-800',
    },
    {
      title: t('dashboard.kpi.deals'),
      value: '42',
      change: 5.2,
      trend: 'up',
      icon: Briefcase,
      bgColor: 'bg-gradient-to-br from-blue-600 to-blue-800',
    },
    {
      title: t('dashboard.kpi.contacts'),
      value: number(1234),
      change: 8.1,
      trend: 'up',
      icon: Users,
      bgColor: 'bg-gradient-to-br from-purple-600 to-purple-800',
    },
    {
      title: t('dashboard.kpi.winRate'),
      value: percent(68),
      change: -2.3,
      trend: 'down',
      icon: TrendingUp,
      bgColor: 'bg-gradient-to-br from-orange-600 to-orange-800',
    },
  ]

  const chartData = [
    { month: '2026-01-01', revenue: 42000, deals: 24 },
    { month: '2026-02-01', revenue: 35000, deals: 18 },
    { month: '2026-03-01', revenue: 48000, deals: 32 },
    { month: '2026-04-01', revenue: 52000, deals: 28 },
    { month: '2026-05-01', revenue: 61000, deals: 35 },
    { month: '2026-06-01', revenue: 55000, deals: 30 },
  ].map((row) => ({ ...row, label: monthShort(row.month) }))

  const feedTitles = raw('dashboard.feed')
  const activities = [
    { id: 1, hours: 2, user: 'Sarah Chen' },
    { id: 2, hours: 4, user: 'John Doe' },
    { id: 3, hours: 4, user: 'Emma Wilson' },
    { id: 4, hours: 8, user: 'Alex Kumar' },
  ].map((item, index) => ({
    ...item,
    title: feedTitles[index],
    time: t('dashboard.hoursAgo', { count: item.hours }),
  }))

  const pipelineStages = [
    { key: 'prospecting', label: t('pipeline.stages.prospecting'), count: 8, width: '30%', color: 'bg-blue-500' },
    { key: 'qualification', label: t('pipeline.stages.qualification'), count: 12, width: '45%', color: 'bg-purple-500' },
    { key: 'negotiation', label: t('pipeline.stages.negotiation'), count: 15, width: '55%', color: 'bg-green-500' },
    { key: 'closed', label: t('pipeline.stages.closed'), count: 7, width: '25%', color: 'bg-emerald-500' },
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
              {signedPercent(change)}
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
          <h1 className="text-4xl font-bold text-white mb-2">{t('dashboard.title')}</h1>
          <p className="text-gray-400">{t('dashboard.subtitle')}</p>
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
            <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.revenueTrend')}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a8a" />
                <XAxis dataKey="label" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" tickFormatter={(value) => moneyCompact(value)} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a202c',
                    border: '1px solid #1e40af',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#fff' }}
                  formatter={(value) => money(value)}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name={t('dashboard.revenueSeries')}
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Stats */}
          <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.pipelineSummary')}</h2>
            <div className="space-y-4">
              {pipelineStages.map((stage) => (
                <div key={stage.key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">{stage.label}</span>
                    <span className="text-white font-semibold">{stage.count}</span>
                  </div>
                  <div className="w-full bg-navy-700 rounded-full h-2">
                    <div className={`${stage.color} h-2 rounded-full`} style={{ width: stage.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">{t('dashboard.recentActivity')}</h2>
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
