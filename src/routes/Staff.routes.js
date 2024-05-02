import express from 'express';
import { getStaff, getStaffById, postStaff, updateStaff, deleteStaff } from '../controllers/Staff.js';

const router = express.Router();

router.get('/staff', getStaff);

router.get('/staff/:id', getStaffById);

router.delete('/staff/:id', deleteStaff);

router.post('/staff', postStaff);

router.put('/staff/:id', updateStaff);

export default router;
