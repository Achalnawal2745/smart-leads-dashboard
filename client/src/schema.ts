export type UserRole = 'admin' | 'sales';

export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  token?: string;
};

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';

export type Lead = {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  total: number;
  page: number;
  pages: number;
};

export type LeadsResponse = {
  success: boolean;
  count: number;
  pagination: Pagination;
  data: Lead[];
};
