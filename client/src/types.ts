export type UserRole = 'admin' | 'sales';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
}

export interface LeadsResponse {
  success: boolean;
  count: number;
  pagination: Pagination;
  data: Lead[];
}
