import { mockTeamMembers } from '../data/mockData';
import { Users, Bell, Zap, Lock } from 'lucide-react';

function SettingSection({ icon: Icon, title, description, children }) {
  return (
    <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="text-blue-accent" size={24} />
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ToggleSetting({ label, description, defaultValue = true }) {
  const [enabled, setEnabled] = React.useState(defaultValue);

  return (
    <div className="flex items-center justify-between py-3 border-b border-blue-accent/20 last:border-0">
      <div>
        <p className="text-white font-semibold">{label}</p>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-blue-accent' : 'bg-gray-600'
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        ></span>
      </button>
    </div>
  );
}

export default function Settings() {
  const React = require('react');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your team, integrations, and preferences.</p>
      </div>

      <SettingSection
        icon={Users}
        title="Team Members"
        description="Manage your CRM team and permissions"
      >
        <div className="space-y-3">
          {mockTeamMembers.map(member => (
            <div key={member.id} className="flex items-center justify-between py-3 border-b border-blue-accent/20 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-accent flex items-center justify-center">
                  <span className="text-lg">{member.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="text-xs text-gray-400">{member.role}</p>
                </div>
              </div>
              <button className="px-3 py-1 rounded border border-blue-accent/30 text-xs text-gray-400 hover:text-white transition-colors">
                Edit
              </button>
            </div>
          ))}
          <button className="w-full mt-4 px-4 py-2 bg-blue-accent hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors">
            + Add Team Member
          </button>
        </div>
      </SettingSection>

      <SettingSection
        icon={Zap}
        title="Integrations"
        description="Connect with external tools and services"
      >
        <div className="space-y-3">
          {['Slack', 'Gmail', 'Microsoft Teams', 'Google Drive'].map(integration => (
            <div key={integration} className="flex items-center justify-between py-3 border-b border-blue-accent/20 last:border-0">
              <div>
                <p className="font-semibold text-white">{integration}</p>
                <p className="text-xs text-gray-400">Not connected</p>
              </div>
              <button className="px-3 py-1 rounded bg-blue-accent/20 text-blue-accent hover:bg-blue-accent/40 transition-colors text-sm font-semibold">
                Connect
              </button>
            </div>
          ))}
        </div>
      </SettingSection>

      <SettingSection
        icon={Bell}
        title="Notifications"
        description="Control how you receive alerts and updates"
      >
        <div>
          <ToggleSetting label="Email Notifications" description="Receive email alerts for deal updates" />
          <ToggleSetting label="Deal Reminders" description="Get reminded about upcoming deal deadlines" />
          <ToggleSetting label="New Contact Alerts" description="Notify me when new contacts are added" />
          <ToggleSetting label="Weekly Summary" description="Receive a weekly summary of activities" defaultValue={false} />
        </div>
      </SettingSection>

      <SettingSection
        icon={Lock}
        title="Security & Privacy"
        description="Manage your account security settings"
      >
        <div className="space-y-3">
          <button className="w-full px-4 py-2 border border-blue-accent/30 text-blue-accent hover:bg-blue-accent/10 rounded-lg font-semibold transition-colors">
            Change Password
          </button>
          <button className="w-full px-4 py-2 border border-blue-accent/30 text-blue-accent hover:bg-blue-accent/10 rounded-lg font-semibold transition-colors">
            Two-Factor Authentication
          </button>
          <button className="w-full px-4 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg font-semibold transition-colors">
            Export My Data
          </button>
        </div>
      </SettingSection>
    </div>
  );
}
