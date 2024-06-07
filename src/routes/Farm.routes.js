import express from 'express';
import { getFarms, getFarmById, postFarm, updateFarm, deleteFarm, getFarmsByUserId } from '../controllers/Farm.js';

const router = express.Router();

router.get('/farms', getFarms);

router.get('/farms/:id', getFarmById);

router.get('/farms/user/:userId', getFarmsByUserId); // Route for getting farms by userId

router.delete('/farms/:id', deleteFarm);

router.post('/farms', postFarm);

router.put('/farms/:id', updateFarm);



export default router;
