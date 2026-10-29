import { Phone, Mail, MessageSquare, Calendar, Plus, Filter } from 'lucide-react'
import { useI18n } from '../i18n'

const Activities = () => {
  const { t, raw, date, time } = useI18n()

  // Language independent data; titles/companies/descriptions come from i18n.
  const activityData = [
    { id: 1, type: 'call', user: 'John Doe', date: '2026-06-20', start: '14:30', durationMinutes: 45 },
    { id: 2, type: 'email', user: 'Emma Wilson', date: '2026-06-20', start: '10:15', durationMinutes: null },
    { id: 3, type: 'meeting', user: 'Sarah Chen', date: '2026-06-19', start: '15:00', durationMinutes: 60 },
    { id: 4, type: 'call', user: 'Alex Kumar', date: '2026-06-19', start: '11:00', durationMinutes: 30 },
    { id: 5, type: 'email', user: 'John Doe', date: '2026-06-18', start: '16:45', durationMinutes: null },
    { id: 6, type: 'meeting', user: 'Emma Wilson', date: '2026-06-18', start: '14:00', durationMinutes: 90 },
    { id: 7, type: 'call', user: 'Sarah Chen', date: '2026-06-17', start: '13:30', durationMinutes: 60 },
    { id: 8, type: 'email', user: 'Alex Kumar', date: '2026-06-17', start: '09:00', durationMinutes: null },
  ]

  const copy = raw('activities.items')
  const activities = activityData.map((item, index) => ({
    ...item,
    title: copy[index].title,
    company: copy[index].company,
    description: copy[index].description,
  }))

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
                {t(`activities.types.${activity.type}`)}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-3">{activity.description}</p>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{activity.user}</span>
              <div className="flex gap-4">
                <span>{time(activity.start)}</span>
                {activity.durationMinutes && (
                  <span>{t('activities.durationMinutes', { count: activity.durationMinutes })}</span>
                )}
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
            <h1 className="text-4xl font-bold text-white mb-2">{t('activities.title')}</h1>
            <p className="text-gray-400">{t('activities.subtitle')}</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            {t('activities.log')}
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-navy-800 border border-blue-900 rounded-lg p-4 mb-6 flex gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">{t('activities.filters.all')}</button>
          <button className="px-4 py-2 bg-navy-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-navy-600">{t('activities.filters.calls')}</button>
          <button className="px-4 py-2 bg-navy-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-navy-600">{t('activities.filters.emails')}</button>
          <button className="px-4 py-2 bg-navy-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-navy-600">{t('activities.filters.meetings')}</button>
        </div>

        {/* Activities Timeline */}
        <div className="space-y-8">
          {sortedDates.map(day => (
            <div key={day}>
              {/* Date Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-px bg-blue-900"></div>
                <h2 className="text-sm font-semibold text-gray-400 whitespace-nowrap">
                  {date(day, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex-1 h-px bg-blue-900"></div>
              </div>

              {/* Activities for this date */}
              <div className="space-y-4">
                {groupedActivities[day].map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Activities
