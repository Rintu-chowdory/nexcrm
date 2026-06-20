import { mockKPIs, mockRecentActivity, mockChartData, mockMonthlyData } from '../data/mockData';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function KPICard({ icon: Icon, label, value, trend }) {
  return (
    <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6 hover:border-blue-accent/60 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <Icon className="text-blue-accent" size={24} />
        {trend && <span className="text-green-400 text-sm flex items-center gap-1"><TrendingUp size={16} />{trend}%</span>}
      </div>
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className="text-2xl font-bold text-white">
        {typeof value === 'number' && value > 999 ? `${(value / 1000).toFixed(1)}K` : value}
        {label.includes('Rate') ? '%' : ''}
      </p>
    </div>
  );
}

function ActivityItem({ activity }) {
  const typeEmoji = {
    call: '📞',
    email: '📧',
    meeting: '📅',
  };

  return (
    <div className="flex gap-4 pb-4 border-b border-blue-accent/20 last:border-0">
      <div className="text-2xl">{typeEmoji[activity.type]}</div>
      <div className="flex-1">
        <p className="font-semibold text-white">{activity.title}</p>
        <p className="text-sm text-gray-400">{activity.description}</p>
        <p className="text-xs text-gray-500 mt-1">{new Date(activity.timestamp).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your sales overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard icon={Users} label="Total Contacts" value={mockKPIs.totalContacts} trend={12} />
        <KPICard icon={Briefcase} label="Active Deals" value={mockKPIs.activeDeals} trend={8} />
        <KPICard icon={DollarSign} label="Total Revenue" value={mockKPIs.revenue} trend={15} />
        <KPICard icon={Target} label="Win Rate" value={mockKPIs.winRate} trend={5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-navy-light border border-blue-accent/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Pipeline Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" opacity={0.1} />
              <XAxis dataKey="stage" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#161b22', border: '1px solid #3b82f6' }}
                formatter={(value) => `$${value / 1000}K`}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="pb-3 border-b border-blue-accent/20 last:border-0">
                <p className="text-sm font-semibold text-white">{activity.user}</p>
                <p className="text-xs text-gray-400">{activity.action} <span className="text-blue-accent">{activity.target}</span></p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Monthly Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockMonthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" opacity={0.1} />
            <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#161b22', border: '1px solid #3b82f6' }}
              formatter={(value) => `$${value / 1000}K`}
            />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
