import { useState } from 'react';
import { mockActivities } from '../data/mockData';
import { Filter } from 'lucide-react';

function ActivityCard({ activity }) {
  const typeInfo = {
    call: { emoji: '📞', bgColor: 'bg-blue-500/20', textColor: 'text-blue-400' },
    email: { emoji: '📧', bgColor: 'bg-purple-500/20', textColor: 'text-purple-400' },
    meeting: { emoji: '📅', bgColor: 'bg-green-500/20', textColor: 'text-green-400' },
  };

  const info = typeInfo[activity.type];
  const date = new Date(activity.timestamp);

  return (
    <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6 hover:border-blue-accent/60 transition-colors">
      <div className="flex items-start gap-4">
        <div className={`${info.bgColor} ${info.textColor} w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>
          {info.emoji}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{activity.title}</h3>
          <p className="text-gray-400 mb-3">{activity.description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{activity.contact}</span>
            <span className="text-gray-500">{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Activities() {
  const [typeFilter, setTypeFilter] = useState('All');

  const types = ['All', 'call', 'email', 'meeting'];

  const filteredActivities = mockActivities.filter(activity =>
    typeFilter === 'All' || activity.type === typeFilter
  ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Activities</h1>
        <p className="text-gray-400">Track all calls, emails, and meetings.</p>
      </div>

      <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            <Filter size={20} className="text-gray-400" />
            {types.map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  typeFilter === type
                    ? 'bg-blue-accent text-white'
                    : 'bg-navy border border-blue-accent/30 text-gray-400 hover:text-white'
                }`}
              >
                {type === 'All' ? 'All Activities' : `${type.charAt(0).toUpperCase() + type.slice(1)}s`}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredActivities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No activities found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
