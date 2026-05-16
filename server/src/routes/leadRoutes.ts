import express from 'express';
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from '../controllers/leadController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getLeads)
  .post(createLead);

router.get('/export', exportLeadsCSV);

router.route('/:id')
  .get(getLead)
  .put(updateLead)
  .delete(authorize('admin'), deleteLead);

export default router;
