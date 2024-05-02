import { pool } from "../db/db.js";

export const getStaff = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Staff');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

export const postStaff = async (req, res) => {
    const { Id, Name, BirthDate, Farm_Id, IsDeleted, Username, Password } = req.body;
    try {
        await pool.query("INSERT INTO Staff (Id, Name, BirthDate, Farm_Id, IsDeleted, Username, Password) VALUES (?, ?, ?, ?, ?, ?, ?)", [Id, Name, BirthDate, Farm_Id, IsDeleted, Username, Password]);
        res.send("Registro de personal agregado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

export const getStaffById = async (req, res) => {
    const id = req.params.id;
    try {
        const [staff] = await pool.query("SELECT * FROM Staff WHERE Id = ?", [id]);
        if (staff.length > 0) {
            res.json(staff[0]);
        } else {
            res.status(404).send("Personal no encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

export const updateStaff = async (req, res) => {
    const id = req.params.id;
    const { Name, BirthDate, Farm_Id, IsDeleted, Username, Password } = req.body;
    try {
        await pool.query("UPDATE Staff SET Name=?, BirthDate=?, Farm_Id=?, IsDeleted=?, Username=?, Password=? WHERE Id=?", [Name, BirthDate, Farm_Id, IsDeleted, Username, Password, id]);
        res.send("Registro de personal actualizado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

export const deleteStaff = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query("DELETE FROM Staff WHERE Id=?", [id]);
        res.send("Registro de personal eliminado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};
