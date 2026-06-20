import { mockPipelineStages } from '../data/mockData';
import { DollarSign } from 'lucide-react';

function DealCard({ deal }) {
  return (
    <div className="bg-navy border border-blue-accent/30 rounded-lg p-4 hover:border-blue-accent/60 transition-all cursor-move hover:shadow-lg hover:shadow-blue-accent/20">
      <p className="font-semibold text-white mb-2">{deal.name}</p>
      <div className="flex items-center gap-2 mb-3">
        <DollarSign size={16} className="text-green-400" />
        <span className="text-green-400 font-bold">${(deal.value / 1000).toFixed(0)}K</span>
      </div>
      <p className="text-xs text-gray-400">{deal.contact}</p>
    </div>
  );
}

function KanbanColumn({ stage }) {
  const totalValue = stage.deals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div className="flex-1 min-w-72">
      <div className="bg-navy-light border border-blue-accent/30 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-accent/20 to-transparent p-4 border-b border-blue-accent/30">
          <h3 className="font-bold text-white mb-1">{stage.title}</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">{stage.deals.length} deals</p>
            <p className="text-sm font-semibold text-blue-accent">${(totalValue / 1000).toFixed(0)}K</p>
          </div>
        </div>

        <div className="p-4 space-y-3 min-h-96 bg-navy/30">
          {stage.deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Pipeline() {
  const totalPipelineValue = mockPipelineStages.reduce((sum, stage) =>
    sum + stage.deals.reduce((stageSum, deal) => stageSum + deal.value, 0), 0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Sales Pipeline</h1>
        <p className="text-gray-400">Drag deals across stages to update their status.</p>
      </div>

      <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Total Pipeline Value</p>
            <p className="text-3xl font-bold text-green-400">${(totalPipelineValue / 1000000).toFixed(2)}M</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm mb-1">Total Deals</p>
            <p className="text-3xl font-bold text-blue-accent">
              {mockPipelineStages.reduce((sum, stage) => sum + stage.deals.length, 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-6 pb-6 overflow-x-auto">
        {mockPipelineStages.map(stage => (
          <KanbanColumn key={stage.id} stage={stage} />
        ))}
      </div>
    </div>
  );
}
