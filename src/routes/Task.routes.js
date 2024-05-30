import express from 'express';
import { getTasks, getTaskById, postTask, updateTask, deleteTask } from '../controllers/Task.js';
const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', postTask);
router.put('/tasks/:id', updateTask);
router
.delete('/tasks/:id', deleteTask);

export default router;

