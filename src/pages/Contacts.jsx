import { useState } from 'react'
import { Search, Plus, Filter, MoreVertical } from 'lucide-react'

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const contacts = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@acme.com', company: 'Acme Corp', status: 'active', phone: '+1-555-0101' },
    { id: 2, name: 'Mike Chen', email: 'mike@techstart.com', company: 'TechStart Inc', status: 'active', phone: '+1-555-0102' },
    { id: 3, name: 'Emma Wilson', email: 'emma@innovate.io', company: 'Innovate Labs', status: 'lead', phone: '+1-555-0103' },
    { id: 4, name: 'James Brown', email: 'james@venture.co', company: 'Venture Capital', status: 'active', phone: '+1-555-0104' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa@global.com', company: 'Global Solutions', status: 'inactive', phone: '+1-555-0105' },
    { id: 6, name: 'David Martinez', email: 'david@prime.net', company: 'Prime Industries', status: 'lead', phone: '+1-555-0106' },
    { id: 7, name: 'Rachel Green', email: 'rachel@apex.io', company: 'Apex Digital', status: 'active', phone: '+1-555-0107' },
    { id: 8, name: 'Tom Foster', email: 'tom@nexus.com', company: 'Nexus Corp', status: 'active', phone: '+1-555-0108' },
  ]

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || contact.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-900 text-green-200'
      case 'lead':
        return 'bg-blue-900 text-blue-200'
      case 'inactive':
        return 'bg-gray-700 text-gray-200'
      default:
        return 'bg-gray-700 text-gray-200'
    }
  }

  return (
    <div className="p-8 bg-navy-900 min-h-screen">
      <div className="max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Contacts</h1>
            <p className="text-gray-400">Manage and organize your customer relationships</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Plus className="w-5 h-5" />
            Add Contact
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-navy-800 border border-blue-900 rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
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
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="lead">Lead</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-navy-800 border border-blue-900 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-blue-900 bg-navy-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-blue-900 hover:bg-navy-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{contact.name.charAt(0)}</span>
                        </div>
                        <span className="font-medium text-white">{contact.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{contact.email}</td>
                    <td className="px-6 py-4 text-gray-300">{contact.company}</td>
                    <td className="px-6 py-4 text-gray-300">{contact.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
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
          Showing {filteredContacts.length} of {contacts.length} contacts
        </div>
      </div>
    </div>
  )
}

export default Contacts
