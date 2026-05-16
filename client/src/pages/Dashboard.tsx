import React, { useState, useEffect } from 'react';
import { useAuth } from '../store/AuthContext';
import Navbar from '../components/ui/Navbar';
import LeadsTable from '../components/leads/LeadsTable';
import LeadsFilter from '../components/leads/LeadsFilter';
import LeadForm from '../components/leads/LeadForm';
import api from '../api/axios';
import { Lead, LeadsResponse, Pagination } from '../types';
import { useDebounce } from '../hooks/useDebounce';
import { ChevronLeft, ChevronRight, Loader2, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  
  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [source, setSource] = useState('');
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(1);
  
  const debouncedSearch = useDebounce(search, 500);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | undefined>(undefined);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data } = await api.get<LeadsResponse>('/leads', {
        params: {
          search: debouncedSearch,
          status,
          source,
          sort,
          page,
          limit: 10,
        },
      });
      setLeads(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [debouncedSearch, status, source, sort, page]);

  const handleAddLead = async (formData: any) => {
    try {
      if (editingLead) {
        await api.put(`/leads/${editingLead._id}`, formData);
      } else {
        await api.post('/leads', formData);
      }
      setShowForm(false);
      setEditingLead(undefined);
      fetchLeads();
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/leads/${id}`);
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  const handleExport = () => {
    window.open(`${api.defaults.baseURL}/leads/export`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Leads Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage and track your sales opportunities</p>
        </div>

        <LeadsFilter
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          source={source}
          onSourceChange={setSource}
          sort={sort}
          onSortChange={setSort}
          onExport={handleExport}
          onAdd={() => {
            setEditingLead(undefined);
            setShowForm(true);
          }}
        />

        <div className="card">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : leads.length > 0 ? (
            <>
              <LeadsTable
                leads={leads}
                onEdit={(lead) => {
                  setEditingLead(lead);
                  setShowForm(true);
                }}
                onDelete={handleDeleteLead}
                onView={(lead) => console.log('View', lead)}
                userRole={user?.role || 'sales'}
              />
              
              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Showing <span className="font-medium text-slate-900 dark:text-white">{leads.length}</span> of{' '}
                    <span className="font-medium text-slate-900 dark:text-white">{pagination.total}</span> leads
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="btn btn-secondary p-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === pagination.pages}
                      className="btn btn-secondary p-2"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
                <Users className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">No leads found</h3>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                Try adjusting your filters or add a new lead to get started.
              </p>
            </div>
          )}
        </div>
      </main>

      {showForm && (
        <LeadForm
          title={editingLead ? 'Edit Lead' : 'Create New Lead'}
          initialData={editingLead}
          onSubmit={handleAddLead}
          onCancel={() => {
            setShowForm(false);
            setEditingLead(undefined);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
