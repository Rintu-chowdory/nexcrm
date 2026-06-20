import { useState } from 'react';
import { mockDeals } from '../data/mockData';
import { Search, TrendingUp } from 'lucide-react';

function ProbabilityBar({ probability }) {
  const colors = {
    low: 'bg-red-500',
    medium: 'bg-yellow-500',
    high: 'bg-green-500',
  };

  let level = 'low';
  if (probability >= 70) level = 'high';
  else if (probability >= 40) level = 'medium';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-navy border border-blue-accent/20 rounded-full h-2 overflow-hidden">
        <div className={`h-full ${colors[level]} transition-all`} style={{ width: `${probability}%` }}></div>
      </div>
      <span className="text-sm font-semibold text-white">{probability}%</span>
    </div>
  );
}

export default function Deals() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('All');

  const stages = ['All', 'Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'All' || deal.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Deals</h1>
        <p className="text-gray-400">Manage all your sales deals in one place.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Total Deal Value</p>
          <p className="text-3xl font-bold text-green-400">${(totalValue / 1000000).toFixed(2)}M</p>
        </div>
        <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6">
          <p className="text-gray-400 text-sm mb-2">Number of Deals</p>
          <p className="text-3xl font-bold text-blue-accent">{filteredDeals.length}</p>
        </div>
      </div>

      <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by deal name or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy border border-blue-accent/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-accent"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {stages.map(stage => (
              <button
                key={stage}
                onClick={() => setStageFilter(stage)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                  stageFilter === stage
                    ? 'bg-blue-accent text-white'
                    : 'bg-navy border border-blue-accent/30 text-gray-400 hover:text-white'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-accent/20">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Deal Name</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Contact</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Value</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Stage</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Close Date</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Probability</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map(deal => (
                <tr key={deal.id} className="border-b border-blue-accent/10 hover:bg-navy transition-colors">
                  <td className="px-4 py-3 text-white font-semibold">{deal.name}</td>
                  <td className="px-4 py-3 text-gray-400">{deal.contact}</td>
                  <td className="px-4 py-3 text-green-400 font-semibold">${(deal.value / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      deal.stage === 'Lead' ? 'bg-gray-500/20 text-gray-400' :
                      deal.stage === 'Qualified' ? 'bg-blue-500/20 text-blue-400' :
                      deal.stage === 'Proposal' ? 'bg-purple-500/20 text-purple-400' :
                      deal.stage === 'Negotiation' ? 'bg-orange-500/20 text-orange-400' :
                      deal.stage === 'Closed Won' ? 'bg-green-500/20 text-green-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {deal.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{new Date(deal.closeDate).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <ProbabilityBar probability={deal.probability} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDeals.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No deals found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
