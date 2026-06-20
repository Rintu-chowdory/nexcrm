import { useState } from 'react'
import { Plus, DollarSign, Calendar } from 'lucide-react'

const Pipeline = () => {
  const [deals, setDeals] = useState({
    prospecting: [
      { id: 1, title: 'Startup Consultation', company: 'TechVentures', amount: '$15,000', date: 'Jun 25' },
      { id: 2, title: 'Enterprise Package', company: 'GlobalTech', amount: '$45,000', date: 'Jun 28' },
    ],
    qualification: [
      { id: 3, title: 'Growth Package', company: 'InnovateLabs', amount: '$25,000', date: 'Jul 5' },
      { id: 4, title: 'Custom Solution', company: 'PrimeCorp', amount: '$65,000', date: 'Jul 10' },
      { id: 5, title: 'Starter Plan', company: 'FastStartup', amount: '$8,000', date: 'Jul 2' },
    ],
    negotiation: [
      { id: 6, title: 'Annual Contract', company: 'BigCorp', amount: '$120,000', date: 'Jul 15' },
      { id: 7, title: 'Partnership Deal', company: 'DataSys', amount: '$85,000', date: 'Jul 20' },
    ],
    closed: [
      { id: 8, title: 'Enterprise Deal', company: 'AcmeTech', amount: '$95,000', date: 'Jun 10' },
      { id: 9, title: 'Expansion Deal', company: 'VentureCorp', amount: '$55,000', date: 'Jun 15' },
    ],
  })

  const stages = [
    { key: 'prospecting', label: 'Prospecting', color: 'bg-blue-600' },
    { key: 'qualification', label: 'Qualification', color: 'bg-purple-600' },
    { key: 'negotiation', label: 'Negotiation', color: 'bg-orange-600' },
    { key: 'closed', label: 'Closed Won', color: 'bg-green-600' },
  ]

  const handleDragStart = (e, dealId, fromStage) => {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('dealId', dealId)
    e.dataTransfer.setData('fromStage', fromStage)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, toStage) => {
    e.preventDefault()
    const dealId = parseInt(e.dataTransfer.getData('dealId'))
    const fromStage = e.dataTransfer.getData('fromStage')

    if (fromStage !== toStage) {
      const deal = deals[fromStage].find(d => d.id === dealId)
      setDeals(prev => ({
        ...prev,
        [fromStage]: prev[fromStage].filter(d => d.id !== dealId),
        [toStage]: [...prev[toStage], deal]
      }))
    }
  }

  const DealCard = ({ deal, stage }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, deal.id, stage)}
      className="bg-navy-700 border border-blue-900 rounded-lg p-4 cursor-move hover:border-blue-500 transition-colors"
    >
      <h3 className="font-semibold text-white mb-2">{deal.title}</h3>
      <p className="text-sm text-gray-400 mb-3">{deal.company}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-emerald-400">
          <DollarSign className="w-4 h-4" />
          <span className="font-semibold">{deal.amount}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Calendar className="w-4 h-4" />
          {deal.date}
        </div>
      </div>
    </div>
  )

  const getTotalAmount = (stageDeals) => {
    return stageDeals.reduce((sum, deal) => {
      const amount = parseInt(deal.amount.replace(/[$,]/g, ''))
      return sum + amount
    }, 0)
  }

  return (
    <div className="p-8 bg-navy-900 min-h-screen">
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Sales Pipeline</h1>
            <p className="text-gray-400">Drag and drop deals between stages</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Add Deal
          </button>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <div key={stage.key} className="flex flex-col">
              {/* Stage Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  <h2 className="font-semibold text-white">{stage.label}</h2>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {deals[stage.key].length} deals
                  </span>
                  <span className="text-sm font-semibold text-emerald-400">
                    ${(getTotalAmount(deals[stage.key]) / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>

              {/* Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.key)}
                className="flex-1 bg-navy-800 border-2 border-dashed border-blue-900 rounded-lg p-4 space-y-3 hover:border-blue-500 transition-colors"
              >
                {deals[stage.key].map((deal) => (
                  <DealCard key={deal.id} deal={deal} stage={stage.key} />
                ))}

                {deals[stage.key].length === 0 && (
                  <div className="flex items-center justify-center h-32 text-gray-500">
                    <p className="text-sm">Drop deals here</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-navy-800 border border-blue-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Pipeline Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stages.map((stage) => (
              <div key={stage.key}>
                <p className="text-sm text-gray-400 mb-2">{stage.label}</p>
                <p className="text-2xl font-bold text-white">
                  ${(getTotalAmount(deals[stage.key]) / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {deals[stage.key].length} deals
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pipeline
