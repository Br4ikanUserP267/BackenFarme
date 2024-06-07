import express from 'express';
import { getStaff, getStaffById, postStaff, updateStaff, deleteStaff, loginStaff, addFarmToStaff, getFarmsByStaffId } from '../controllers/Staff.js';

const router = express.Router();

// Staff routes
router.get('/staff', getStaff);
router.get('/staff/:id', getStaffById);
router.post('/staff', postStaff);
router.put('/staff/:id', updateStaff);
router.delete('/staff/:id', deleteStaff);

// Login route
router.post('/staff/login', loginStaff);

// Farm-Staff relationship routes
router.post('/staff/farm', addFarmToStaff);
router.get('/staff/:id/farms', getFarmsByStaffId);

export default router;
