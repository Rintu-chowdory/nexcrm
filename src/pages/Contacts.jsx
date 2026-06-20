import { useState } from 'react';
import { mockContacts } from '../data/mockData';
import { Search, Filter } from 'lucide-react';

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Contacts</h1>
        <p className="text-gray-400">Manage and view all customer contacts.</p>
      </div>

      <div className="bg-navy-light border border-blue-accent/30 rounded-lg p-6">
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-navy border border-blue-accent/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-accent"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {['All', 'Active', 'Inactive'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  statusFilter === status
                    ? 'bg-blue-accent text-white'
                    : 'bg-navy border border-blue-accent/30 text-gray-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-blue-accent/20">
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Name</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Company</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Email</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Phone</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Status</th>
                <th className="text-left px-4 py-3 text-gray-400 font-semibold">Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map(contact => (
                <tr key={contact.id} className="border-b border-blue-accent/10 hover:bg-navy transition-colors">
                  <td className="px-4 py-3 text-white">{contact.name}</td>
                  <td className="px-4 py-3 text-gray-400">{contact.company}</td>
                  <td className="px-4 py-3 text-gray-400">{contact.email}</td>
                  <td className="px-4 py-3 text-gray-400">{contact.phone}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      contact.status === 'Active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{new Date(contact.lastContact).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No contacts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
