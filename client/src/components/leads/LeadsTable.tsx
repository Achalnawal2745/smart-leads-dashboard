import React from 'react';
export type UserRole = 'admin' | 'sales';
export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdAt: string;
  updatedAt: string;
}

import { getStatusColor, getSourceColor } from '../../utils/colors';
import { format } from 'date-fns';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';

interface LeadsTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
  userRole: UserRole;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onEdit, onDelete, onView, userRole }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Source</th>
            <th className="px-6 py-4 font-medium">Created At</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {leads.map((lead) => (
            <tr key={lead._id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{lead.name}</td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{lead.email}</td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getSourceColor(lead.source)}`}>
                  {lead.source}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                {format(new Date(lead.createdAt), 'MMM dd, yyyy')}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onView(lead)}
                    className="p-1 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                    title="View Details"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEdit(lead)}
                    className="p-1 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400"
                    title="Edit Lead"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  {userRole === 'admin' && (
                    <button
                      onClick={() => onDelete(lead._id)}
                      className="p-1 text-slate-400 hover:text-red-600 dark:hover:text-red-400"
                      title="Delete Lead"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
