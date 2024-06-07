import express from 'express';
import { getTasks, getTaskById, postTask, updateTask, deleteTask ,getTasksByStaffId} from '../controllers/Task.js';
const router = express.Router();

router.get('/tasks', getTasks);
router.get('/tasks/:id', getTaskById);
router.post('/tasks', postTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.get('/tasks/staff/:staffId', getTasksByStaffId); // Nueva ruta para obtener tareas por StaffId

export default router;

