import React from 'react';
import { Search, Filter, Download, Plus } from 'lucide-react';

interface LeadsFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  source: string;
  onSourceChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  onExport: () => void;
  onAdd: () => void;
}

const LeadsFilter: React.FC<LeadsFilterProps> = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  source,
  onSourceChange,
  sort,
  onSortChange,
  onExport,
  onAdd,
}) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="input-field w-auto py-1.5"
        >
          <option value="">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>

        <select
          value={source}
          onChange={(e) => onSourceChange(e.target.value)}
          className="input-field w-auto py-1.5"
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </select>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-field w-auto py-1.5"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

        <button onClick={onExport} className="btn btn-secondary gap-2">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>

        <button onClick={onAdd} className="btn btn-primary gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Lead</span>
        </button>
      </div>
    </div>
  );
};

export default LeadsFilter;
