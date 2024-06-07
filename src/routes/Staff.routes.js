import express from 'express';
import { getStaff, getStaffById, postStaff, updateStaff, deleteStaff, loginStaff,getStaffByFarmId} from '../controllers/Staff.js';

const router = express.Router();

// Staff routes
router.get('/staff', getStaff);
router.get('/staff/:id', getStaffById);
router.post('/staff', postStaff);
router.put('/staff/:id', updateStaff);
router.delete('/staff/:id', deleteStaff);
router.get("/staff_byFarmId/:farmId",getStaffByFarmId)
// Login route
router.post('/staff/login', loginStaff);


export default router;
