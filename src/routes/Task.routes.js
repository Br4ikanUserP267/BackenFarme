import express from 'express';
import { getTasks, getTaskById, postTask, updateTask, deleteTask } from './controllers/tasksController.js';
const router = express.Router();

app.get('/tasks', getTasks);
app.get('/tasks/:id', getTaskById);
app.post('/tasks', postTask);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

export default router;

