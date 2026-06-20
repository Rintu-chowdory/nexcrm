import { useState } from 'react'
import { Users, Zap, Bell, Lock, Plus, Trash2, MoreVertical } from 'lucide-react'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('team')

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@nexcrm.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Sarah Chen', email: 'sarah@nexcrm.com', role: 'Manager', status: 'active' },
    { id: 3, name: 'Emma Wilson', email: 'emma@nexcrm.com', role: 'Sales Rep', status: 'active' },
    { id: 4, name: 'Alex Kumar', email: 'alex@nexcrm.com', role: 'Sales Rep', status: 'active' },
  ])

  const integrations = [
    { id: 1, name: 'Slack', icon: '💬', status: 'connected', description: 'Sync updates to Slack channels' },
    { id: 2, name: 'Google Calendar', icon: '📅', status: 'connected', description: 'Sync meetings and events' },
    { id: 3, name: 'Stripe', icon: '💳', status: 'connected', description: 'Track payment transactions' },
    { id: 4, name: 'Mailchimp', icon: '📧', status: 'not-connected', description: 'Email campaign automation' },
    { id: 5, name: 'Zapier', icon: '⚡', status: 'not-connected', description: 'Workflow automation' },
    { id: 6, name: 'GitHub', icon: '🐙', status: 'connected', description: 'Project management integration' },
  ]

  const removeMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id))
  }

  const TabButton = ({ tab, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
        activeTab === tab
          ? 'text-blue-400 border-b-2 border-blue-400'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  )

  return (
    <div className="p-8 bg-navy-900 min-h-screen">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your team and integrations</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-blue-900 mb-8">
          <TabButton tab="team" label="Team Members" icon={Users} />
          <TabButton tab="integrations" label="Integrations" icon={Zap} />
          <TabButton tab="notifications" label="Notifications" icon={Bell} />
          <TabButton tab="security" label="Security" icon={Lock} />
        </div>

        {/* Team Members Tab */}
        {activeTab === 'team' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Team Members</h2>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                <Plus className="w-5 h-5" />
                Invite Member
              </button>
            </div>

            <div className="space-y-4">
              {teamMembers.map(member => (
                <div key={member.id} className="bg-navy-800 border border-blue-900 rounded-lg p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{member.name}</h3>
                      <p className="text-sm text-gray-400">{member.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-gray-300 mb-1">{member.role}</p>
                      <span className="inline-block px-3 py-1 bg-green-900 text-green-200 text-xs font-medium rounded-full">
                        {member.status}
                      </span>
                    </div>
                    <button
                      onClick={() => removeMember(member.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Integrations Tab */}
        {activeTab === 'integrations' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Integrations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map(integration => (
                <div key={integration.id} className="bg-navy-800 border border-blue-900 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{integration.icon}</div>
                      <div>
                        <h3 className="font-semibold text-white">{integration.name}</h3>
                        <p className="text-sm text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      integration.status === 'connected'
                        ? 'bg-green-900 text-green-200'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                    </span>
                    <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      integration.status === 'connected'
                        ? 'bg-navy-700 text-gray-300 hover:bg-navy-600'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      {integration.status === 'connected' ? 'Configure' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>

            <div className="space-y-4">
              {[
                { title: 'Email Notifications', description: 'Receive email updates on deals and activities' },
                { title: 'Deal Closed Alerts', description: 'Get notified when a deal is closed' },
                { title: 'New Contact Alerts', description: 'Receive alerts for new contacts added' },
                { title: 'Activity Reminders', description: 'Reminders for scheduled activities' },
                { title: 'Weekly Summary', description: 'Receive weekly performance summary' },
              ].map((pref, idx) => (
                <div key={idx} className="bg-navy-800 border border-blue-900 rounded-lg p-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{pref.title}</h3>
                    <p className="text-sm text-gray-400">{pref.description}</p>
                  </div>
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>

            <div className="space-y-4">
              <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
                <h3 className="font-semibold text-white mb-2">Change Password</h3>
                <p className="text-sm text-gray-400 mb-4">Update your account password</p>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Change Password
                </button>
              </div>

              <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
                <h3 className="font-semibold text-white mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Enable 2FA
                </button>
              </div>

              <div className="bg-navy-800 border border-blue-900 rounded-lg p-6">
                <h3 className="font-semibold text-white mb-2">API Keys</h3>
                <p className="text-sm text-gray-400 mb-4">Manage your API keys for integrations</p>
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  View API Keys
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Settings
