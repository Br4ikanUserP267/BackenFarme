import { pool } from "../db/db.js";

// Get all tasks
export const getTasks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Tasks');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

// Get task by ID
export const getTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        const [task] = await pool.query("SELECT * FROM Tasks WHERE Id = ?", [id]);
        if (task.length > 0) {
            res.json(task[0]);
        } else {
            res.status(404).send("Tarea no encontrada");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

// Create a new task
export const postTask = async (req, res) => {
    const { Name, Description, Status, IsDeleted, Staff_Id } = req.body;
    try {
        await pool.query("INSERT INTO Tasks (Name, Description, Status, IsDeleted, Staff_Id) VALUES (?, ?, ?, ?, ?)", [Name, Description, Status, IsDeleted, Staff_Id]);
        res.send("Tarea agregada correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

// Update a task
export const updateTask = async (req, res) => {
    const id = req.params.id;
    const { Name, Description, Status, IsDeleted, Staff_Id } = req.body;
    try {
        await pool.query("UPDATE Tasks SET Name=?, Description=?, Status=?, IsDeleted=?, Staff_Id=? WHERE Id=?", [Name, Description, Status, IsDeleted, Staff_Id, id]);
        res.send("Tarea actualizada correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query("UPDATE Tasks SET IsDeleted = 1 WHERE Id = ?", [id]);
        res.send("Tarea marcada como eliminada correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};