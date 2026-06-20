export const mockKPIs = {
  totalContacts: 1245,
  activeDeals: 48,
  revenue: 2450000,
  winRate: 68,
};

export const mockContacts = [
  { id: 1, name: 'John Smith', company: 'Acme Corp', email: 'john@acme.com', phone: '+1-555-0101', status: 'Active', lastContact: '2026-06-18' },
  { id: 2, name: 'Sarah Johnson', company: 'TechFlow', email: 'sarah@techflow.com', phone: '+1-555-0102', status: 'Active', lastContact: '2026-06-17' },
  { id: 3, name: 'Mike Chen', company: 'Digital Ventures', email: 'mike@digitalventures.com', phone: '+1-555-0103', status: 'Inactive', lastContact: '2026-06-10' },
  { id: 4, name: 'Emma Davis', company: 'Cloud Systems Inc', email: 'emma@cloudsystems.com', phone: '+1-555-0104', status: 'Active', lastContact: '2026-06-19' },
  { id: 5, name: 'David Wilson', company: 'Innovation Labs', email: 'david@innovationlabs.com', phone: '+1-555-0105', status: 'Active', lastContact: '2026-06-16' },
  { id: 6, name: 'Lisa Anderson', company: 'NextGen Solutions', email: 'lisa@nextgen.com', phone: '+1-555-0106', status: 'Inactive', lastContact: '2026-06-05' },
  { id: 7, name: 'James Martinez', company: 'Future Corp', email: 'james@futurecorp.com', phone: '+1-555-0107', status: 'Active', lastContact: '2026-06-19' },
  { id: 8, name: 'Rachel Brown', company: 'Smart Analytics', email: 'rachel@smartanalytics.com', phone: '+1-555-0108', status: 'Active', lastContact: '2026-06-18' },
];

export const mockPipelineStages = [
  {
    id: 'lead',
    title: 'Lead',
    deals: [
      { id: 1, name: 'Website Redesign', value: 45000, contact: 'John Smith' },
      { id: 2, name: 'ERP Implementation', value: 120000, contact: 'Sarah Johnson' },
      { id: 3, name: 'Cloud Migration', value: 85000, contact: 'Emma Davis' },
    ]
  },
  {
    id: 'qualified',
    title: 'Qualified',
    deals: [
      { id: 4, name: 'Data Analytics Platform', value: 200000, contact: 'Mike Chen' },
      { id: 5, name: 'CRM Integration', value: 95000, contact: 'David Wilson' },
    ]
  },
  {
    id: 'proposal',
    title: 'Proposal',
    deals: [
      { id: 6, name: 'Security Audit', value: 65000, contact: 'Lisa Anderson' },
      { id: 7, name: 'API Development', value: 150000, contact: 'James Martinez' },
      { id: 8, name: 'Mobile App', value: 180000, contact: 'Rachel Brown' },
    ]
  },
  {
    id: 'negotiation',
    title: 'Negotiation',
    deals: [
      { id: 9, name: 'Infrastructure Upgrade', value: 280000, contact: 'John Smith' },
      { id: 10, name: 'Staff Augmentation', value: 120000, contact: 'Emma Davis' },
    ]
  },
  {
    id: 'closed-won',
    title: 'Closed Won',
    deals: [
      { id: 11, name: 'Consulting Services', value: 95000, contact: 'Sarah Johnson' },
      { id: 12, name: 'License Purchase', value: 45000, contact: 'David Wilson' },
    ]
  },
  {
    id: 'closed-lost',
    title: 'Closed Lost',
    deals: [
      { id: 13, name: 'Legacy System Replacement', value: 200000, contact: 'Mike Chen' },
    ]
  },
];

export const mockDeals = [
  { id: 1, name: 'Website Redesign', value: 45000, stage: 'Lead', contact: 'John Smith', closeDate: '2026-07-15', probability: 30 },
  { id: 2, name: 'ERP Implementation', value: 120000, stage: 'Lead', contact: 'Sarah Johnson', closeDate: '2026-08-20', probability: 25 },
  { id: 3, name: 'Cloud Migration', value: 85000, stage: 'Lead', contact: 'Emma Davis', closeDate: '2026-07-30', probability: 35 },
  { id: 4, name: 'Data Analytics Platform', value: 200000, stage: 'Qualified', contact: 'Mike Chen', closeDate: '2026-09-10', probability: 60 },
  { id: 5, name: 'CRM Integration', value: 95000, stage: 'Qualified', contact: 'David Wilson', closeDate: '2026-08-15', probability: 55 },
  { id: 6, name: 'Security Audit', value: 65000, stage: 'Proposal', contact: 'Lisa Anderson', closeDate: '2026-07-20', probability: 70 },
  { id: 7, name: 'API Development', value: 150000, stage: 'Proposal', contact: 'James Martinez', closeDate: '2026-09-05', probability: 75 },
  { id: 8, name: 'Mobile App', value: 180000, stage: 'Proposal', contact: 'Rachel Brown', closeDate: '2026-09-30', probability: 65 },
  { id: 9, name: 'Infrastructure Upgrade', value: 280000, stage: 'Negotiation', contact: 'John Smith', closeDate: '2026-08-10', probability: 85 },
  { id: 10, name: 'Staff Augmentation', value: 120000, stage: 'Negotiation', contact: 'Emma Davis', closeDate: '2026-07-25', probability: 80 },
  { id: 11, name: 'Consulting Services', value: 95000, stage: 'Closed Won', contact: 'Sarah Johnson', closeDate: '2026-06-01', probability: 100 },
  { id: 12, name: 'License Purchase', value: 45000, stage: 'Closed Won', contact: 'David Wilson', closeDate: '2026-06-05', probability: 100 },
  { id: 13, name: 'Legacy System Replacement', value: 200000, stage: 'Closed Lost', contact: 'Mike Chen', closeDate: '2026-06-10', probability: 0 },
];

export const mockActivities = [
  { id: 1, type: 'call', title: 'Call with John Smith', description: 'Discussed project timeline and budget', timestamp: '2026-06-20T14:30:00Z', contact: 'John Smith' },
  { id: 2, type: 'email', title: 'Email sent to Sarah Johnson', description: 'Sent proposal for ERP implementation', timestamp: '2026-06-20T10:15:00Z', contact: 'Sarah Johnson' },
  { id: 3, type: 'meeting', title: 'Meeting with Emma Davis', description: 'Cloud migration kickoff meeting', timestamp: '2026-06-19T15:00:00Z', contact: 'Emma Davis' },
  { id: 4, type: 'call', title: 'Call with Mike Chen', description: 'Follow-up on Data Analytics proposal', timestamp: '2026-06-19T11:30:00Z', contact: 'Mike Chen' },
  { id: 5, type: 'email', title: 'Email from David Wilson', description: 'Received feedback on API proposal', timestamp: '2026-06-18T09:45:00Z', contact: 'David Wilson' },
  { id: 6, type: 'meeting', title: 'Team meeting', description: 'Weekly pipeline review', timestamp: '2026-06-18T14:00:00Z', contact: 'Internal' },
  { id: 7, type: 'call', title: 'Call with Lisa Anderson', description: 'Security audit scope discussion', timestamp: '2026-06-17T13:20:00Z', contact: 'Lisa Anderson' },
  { id: 8, type: 'email', title: 'Email sent to James Martinez', description: 'Contract sent for API development', timestamp: '2026-06-17T10:00:00Z', contact: 'James Martinez' },
];

export const mockTeamMembers = [
  { id: 1, name: 'Alice Johnson', role: 'Sales Manager', email: 'alice@nexcrm.com', avatar: '👩' },
  { id: 2, name: 'Bob Smith', role: 'Account Executive', email: 'bob@nexcrm.com', avatar: '👨' },
  { id: 3, name: 'Carol White', role: 'Sales Development Rep', email: 'carol@nexcrm.com', avatar: '👩' },
  { id: 4, name: 'David Lee', role: 'Account Executive', email: 'david@nexcrm.com', avatar: '👨' },
  { id: 5, name: 'Eva Martinez', role: 'Customer Success Manager', email: 'eva@nexcrm.com', avatar: '👩' },
];

export const mockRecentActivity = [
  { id: 1, user: 'Alice Johnson', action: 'Won deal', target: 'Consulting Services', time: '2 hours ago' },
  { id: 2, user: 'Bob Smith', action: 'Created deal', target: 'Website Redesign', time: '4 hours ago' },
  { id: 3, user: 'Carol White', action: 'Added contact', target: 'John Smith', time: '6 hours ago' },
  { id: 4, user: 'David Lee', action: 'Updated deal', target: 'Data Analytics Platform', time: '1 day ago' },
  { id: 5, user: 'Eva Martinez', action: 'Moved deal', target: 'API Development', time: '2 days ago' },
];

export const mockChartData = [
  { stage: 'Lead', value: 250000, deals: 3 },
  { stage: 'Qualified', value: 295000, deals: 2 },
  { stage: 'Proposal', value: 395000, deals: 3 },
  { stage: 'Negotiation', value: 400000, deals: 2 },
  { stage: 'Closed Won', value: 140000, deals: 2 },
  { stage: 'Closed Lost', value: 200000, deals: 1 },
];

export const mockMonthlyData = [
  { month: 'Jan', revenue: 145000 },
  { month: 'Feb', revenue: 165000 },
  { month: 'Mar', revenue: 155000 },
  { month: 'Apr', revenue: 185000 },
  { month: 'May', revenue: 195000 },
  { month: 'Jun', revenue: 210000 },
];
