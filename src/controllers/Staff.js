import { pool } from "../db/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "SINCELEJOTEAMO"; // Replace with a strong secret key

// Get all staff
export const getStaff = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Staff');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

// Add new staff
export const postStaff = async (req, res) => {
    const { Name, BirthDate, IsDeleted, Username, Password, IdCardNumber } = req.body;
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(Password, 10);
        await pool.query("INSERT INTO Staff (Name, BirthDate, IsDeleted, Username, Password, IdCardNumber) VALUES (?, ?, ?, ?, ?, ?)", [Name, BirthDate, IsDeleted, Username, hashedPassword, IdCardNumber]);
        res.send("Registro de personal agregado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

// Get staff by ID
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

// Update staff
export const updateStaff = async (req, res) => {
    const id = req.params.id;
    const { Name, BirthDate, IsDeleted, Username, Password, IdCardNumber } = req.body;
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(Password, 10);
        await pool.query("UPDATE Staff SET Name=?, BirthDate=?, IsDeleted=?, Username=?, Password=?, IdCardNumber=? WHERE Id=?", [Name, BirthDate, IsDeleted, Username, hashedPassword, IdCardNumber, id]);
        res.send("Registro de personal actualizado correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

// Delete staff
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

// Staff login
export const loginStaff = async (req, res) => {
    const { Username, Password } = req.body;
    try {
        const [staff] = await pool.query("SELECT * FROM Staff WHERE Username = ?", [Username]);
        if (staff.length > 0) {
            const validPassword = await bcrypt.compare(Password, staff[0].Password);
            if (validPassword) {
                const token = jwt.sign({ id: staff[0].Id }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).send("Contraseña incorrecta");
            }
        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

// Associate staff with a farm
export const addFarmToStaff = async (req, res) => {
    const { IdStaff, IdFarms } = req.body;
    try {
        await pool.query("INSERT INTO Farm_has_Staff (IdStaff, IdFarms) VALUES (?, ?)", [IdStaff, IdFarms]);
        res.send("Staff asociado a la granja correctamente");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};

// Get farms by staff ID
export const getFarmsByStaffId = async (req, res) => {
    const id = req.params.id;
    try {
        const [farms] = await pool.query("SELECT * FROM Farm_has_Staff WHERE IdStaff = ?", [id]);
        res.json(farms);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error de servidor");
    }
};
