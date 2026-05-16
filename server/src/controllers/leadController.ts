import { Request, Response, NextFunction } from 'express';
import Lead from '../models/Lead';
import { ErrorResponse } from '../middleware/errorMiddleware';

export const createLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, source, search, sort, page = 1, limit = 10 } = req.query;

    const query: any = {};

    if (status) query.status = status;
    if (source) query.source = source;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    let sortQuery: any = { createdAt: -1 };
    if (sort === 'oldest') sortQuery = { createdAt: 1 };

    const leads = await Lead.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limitNum);

    const total = await Lead.countDocuments(query);

    res.json({
      success: true,
      count: leads.length,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
      },
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

export const getLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return next(new ErrorResponse('Lead not found', 404));
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!lead) return next(new ErrorResponse('Lead not found', 404));
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return next(new ErrorResponse('Lead not found', 404));
    res.json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

export const exportLeadsCSV = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leads = await Lead.find({});
    
    let csv = 'Name,Email,Status,Source,Created At\n';
    leads.forEach((lead) => {
      csv += `"${lead.name}","${lead.email}","${lead.status}","${lead.source}","${lead.createdAt}"\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('leads.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
};
