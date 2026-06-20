import { Phone, Mail, MessageSquare, Calendar, Plus, Filter } from 'lucide-react'

const Activities = () => {
  const activities = [
    {
      id: 1,
      type: 'call',
      title: 'Call with Sarah Johnson',
      company: 'Acme Corp',
      description: 'Discussed Q3 requirements and timeline',
      user: 'John Doe',
      date: '2024-06-20',
      time: '2:30 PM',
      duration: '45 mins',
    },
    {
      id: 2,
      type: 'email',
      title: 'Email sent to Mike Chen',
      company: 'TechStart Inc',
      description: 'Sent proposal document for Enterprise Package',
      user: 'Emma Wilson',
      date: '2024-06-20',
      time: '10:15 AM',
      duration: null,
    },
    {
      id: 3,
      type: 'meeting',
      title: 'Team sync meeting',
      company: 'Internal',
      description: 'Weekly sales pipeline review and strategy discussion',
      user: 'Sarah Chen',
      date: '2024-06-19',
      time: '3:00 PM',
      duration: '60 mins',
    },
    {
      id: 4,
      type: 'call',
      title: 'Call with James Brown',
      company: 'Venture Capital',
      description: 'Quarterly business review and renewal discussion',
      user: 'Alex Kumar',
      date: '2024-06-19',
      time: '11:00 AM',
      duration: '30 mins',
    },
    {
      id: 5,
      type: 'email',
      title: 'Email received from Lisa Anderson',
      company: 'Global Solutions',
      description: 'Response to contract negotiation points',
      user: 'John Doe',
      date: '2024-06-18',
      time: '4:45 PM',
      duration: null,
    },
    {
      id: 6,
      type: 'meeting',
      title: 'Product demo for Rachel Green',
      company: 'Apex Digital',
      description: 'Demonstrated new features and integrations',
      user: 'Emma Wilson',
      date: '2024-06-18',
      time: '2:00 PM',
      duration: '90 mins',
    },
    {
      id: 7,
      type: 'call',
      title: 'Call with David Martinez',
      company: 'Prime Industries',
      description: 'Initial discovery call for custom solution',
      user: 'Sarah Chen',
      date: '2024-06-17',
      time: '1:30 PM',
      duration: '60 mins',
    },
    {
      id: 8,
      type: 'email',
      title: 'Email sent to Tom Foster',
      company: 'Nexus Corp',
      description: 'Follow-up on outstanding questions',
      user: 'Alex Kumar',
      date: '2024-06-17',
      time: '9:00 AM',
      duration: null,
    },
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'call':
        return Phone
      case 'email':
        return Mail
      case 'meeting':
        return Calendar
      default:
        return MessageSquare
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'call':
        return 'bg-blue-900 text-blue-300'
      case 'email':
        return 'bg-purple-900 text-purple-300'
      case 'meeting':
        return 'bg-green-900 text-green-300'
      default:
        return 'bg-gray-700 text-gray-300'
    }
  }

  const groupedActivities = {}
  activities.forEach(activity => {
    if (!groupedActivities[activity.date]) {
      groupedActivities[activity.date] = []
    }
    groupedActivities[activity.date].push(activity)
  })

  const sortedDates = Object.keys(groupedActivities).sort().reverse()

  const ActivityCard = ({ activity }) => {
    const IconComponent = getActivityIcon(activity.type)
    return (
      <div className="bg-navy-800 border border-blue-900 rounded-lg p-6 hover:border-blue-500 transition-colors">
        <div className="flex gap-4">
          {/* Icon */}
          <div className={`p-3 rounded-lg flex-shrink-0 ${getActivityColor(activity.type)}`}>
            <IconComponent className="w-6 h-6" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-white">{activity.title}</h3>
                <p className="text-sm text-gray-400">{activity.company}</p>
              </div>
              <span className="text-xs bg-navy-700 text-gray-300 px-2 py-1 rounded">
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-3">{activity.description}</p>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{activity.user}</span>
              <div className="flex gap-4">
                <span>{activity.time}</span>
                {activity.duration && <span>{activity.duration}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-navy-900 min-h-screen">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Activities</h1>
            <p className="text-gray-400">Timeline of all customer interactions</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Log Activity
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-navy-800 border border-blue-900 rounded-lg p-4 mb-6 flex gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">All</button>
          <button className="px-4 py-2 bg-navy-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-navy-600">Calls</button>
          <button className="px-4 py-2 bg-navy-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-navy-600">Emails</button>
          <button className="px-4 py-2 bg-navy-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-navy-600">Meetings</button>
        </div>

        {/* Activities Timeline */}
        <div className="space-y-8">
          {sortedDates.map(date => {
            const dateObj = new Date(date)
            const formattedDate = dateObj.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })

            return (
              <div key={date}>
                {/* Date Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 h-px bg-blue-900"></div>
                  <h2 className="text-sm font-semibold text-gray-400 whitespace-nowrap">{formattedDate}</h2>
                  <div className="flex-1 h-px bg-blue-900"></div>
                </div>

                {/* Activities for this date */}
                <div className="space-y-4">
                  {groupedActivities[date].map(activity => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Activities
