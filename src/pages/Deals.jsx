import { useState } from 'react'
import { Search, Plus, MoreVertical, TrendingUp } from 'lucide-react'

const Deals = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const deals = [
    { id: 1, title: 'Enterprise Package', company: 'Acme Corp', amount: '$95,000', stage: 'closed', owner: 'Sarah Chen', closeDate: '2024-06-10', probability: '100%' },
    { id: 2, title: 'Growth Package', company: 'TechStart Inc', amount: '$45,000', stage: 'negotiation', owner: 'John Doe', closeDate: '2024-06-25', probability: '75%' },
    { id: 3, title: 'Startup Consultation', company: 'InnovateLabs', amount: '$15,000', stage: 'prospecting', owner: 'Emma Wilson', closeDate: '2024-07-05', probability: '25%' },
    { id: 4, title: 'Annual Contract', company: 'GlobalTech', amount: '$120,000', stage: 'negotiation', owner: 'Alex Kumar', closeDate: '2024-07-15', probability: '80%' },
    { id: 5, title: 'Custom Solution', company: 'Prime Industries', amount: '$65,000', stage: 'qualification', owner: 'Sarah Chen', closeDate: '2024-07-20', probability: '50%' },
    { id: 6, title: 'Expansion Deal', company: 'VentureCorp', amount: '$55,000', stage: 'closed', owner: 'John Doe', closeDate: '2024-06-15', probability: '100%' },
    { id: 7, title: 'Partnership Deal', company: 'DataSys', amount: '$85,000', stage: 'negotiation', owner: 'Emma Wilson', closeDate: '2024-07-10', probability: '70%' },
    { id: 8, title: 'Starter Plan', company: 'FastStartup', amount: '$8,000', stage: 'qualification', owner: 'Alex Kumar', closeDate: '2024-06-28', probability: '40%' },
  ]

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || deal.stage === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStageColor = (stage) => {
    switch (stage) {
      case 'prospecting':
        return 'bg-blue-900 text-blue-200'
      case 'qualification':
        return 'bg-purple-900 text-purple-200'
      case 'negotiation':
        return 'bg-orange-900 text-orange-200'
      case 'closed':
        return 'bg-green-900 text-green-200'
      default:
        return 'bg-gray-700 text-gray-200'
    }
  }

  const getProbabilityColor = (probability) => {
    const prob = parseInt(probability)
    if (prob >= 75) return 'text-green-400'
    if (prob >= 50) return 'text-orange-400'
    return 'text-red-400'
  }

  const totalValue = filteredDeals.reduce((sum, deal) => {
    return sum + parseInt(deal.amount.replace(/[$,]/g, ''))
  }, 0)

  return (
    <div className="p-8 bg-navy-900 min-h-screen">
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Deals</h1>
            <p className="text-gray-400">Track and manage your sales opportunities</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            New Deal
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Total Deal Value</p>
            <p className="text-3xl font-bold text-white">${(totalValue / 1000).toFixed(0)}k</p>
          </div>
          <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Active Deals</p>
            <p className="text-3xl font-bold text-white">{filteredDeals.filter(d => d.stage !== 'closed').length}</p>
          </div>
          <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
            <p className="text-gray-400 text-sm mb-2">Closed Deals</p>
            <p className="text-3xl font-bold text-white">{filteredDeals.filter(d => d.stage === 'closed').length}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-navy-800 border border-blue-900 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by deal title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-navy-700 border border-blue-900 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-navy-700 border border-blue-900 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Stages</option>
              <option value="prospecting">Prospecting</option>
              <option value="qualification">Qualification</option>
              <option value="negotiation">Negotiation</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Deals Table */}
        <div className="bg-navy-800 border border-blue-900 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-900 bg-navy-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Deal Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Stage</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Owner</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Close Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Probability</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeals.map((deal) => (
                  <tr key={deal.id} className="border-b border-blue-900 hover:bg-navy-700 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{deal.title}</td>
                    <td className="px-6 py-4 text-gray-300">{deal.company}</td>
                    <td className="px-6 py-4 font-semibold text-emerald-400">{deal.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStageColor(deal.stage)}`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{deal.owner}</td>
                    <td className="px-6 py-4 text-gray-300">{deal.closeDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-4 h-4 ${getProbabilityColor(deal.probability)}`} />
                        <span className={`font-semibold ${getProbabilityColor(deal.probability)}`}>
                          {deal.probability}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-gray-400 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredDeals.length} of {deals.length} deals
        </div>
      </div>
    </div>
  )
}

export default Deals
