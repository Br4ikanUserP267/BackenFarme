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
        res.status(500).send("Server error");
    }
};

//get by farmid
export const getStaffByFarmId = async (req, res) => {
    const farmId = req.params.farmId;
    try {
        const [staff] = await pool.query("SELECT * FROM Staff WHERE Id_farm = ?", [farmId]);
        if (staff.length > 0) {
            res.json(staff); // Return all staff members
        } else {
            res.status(404).send("Staff not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

// Add new staff
export const postStaff = async (req, res) => {
    const { Name, BirthDate, IsDeleted, Username, Password, IdCardNumber, Id_farm } = req.body;
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(Password, 10);
        await pool.query(
            "INSERT INTO Staff (Name, BirthDate, IsDeleted, Username, Password, IdCardNumber, Id_farm) VALUES (?, ?, ?, ?, ?, ?, ?)", 
            [Name, BirthDate, IsDeleted, Username, hashedPassword, IdCardNumber, Id_farm]
        );
        res.send("Staff record added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
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
            res.status(404).send("Staff not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

// Update staff
export const updateStaff = async (req, res) => {
    const id = req.params.id;
    const { Name, BirthDate, IsDeleted, Username, Password, IdCardNumber, Id_farm } = req.body;
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(Password, 10);
        await pool.query(
            "UPDATE Staff SET Name=?, BirthDate=?, IsDeleted=?, Username=?, Password=?, IdCardNumber=?, Id_farm=? WHERE Id=?", 
            [Name, BirthDate, IsDeleted, Username, hashedPassword, IdCardNumber, Id_farm, id]
        );
        res.send("Staff record updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

// Delete staff
export const deleteStaff = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query("DELETE FROM Staff WHERE Id=?", [id]);
        res.send("Staff record deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
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
                res.status(401).send("Incorrect password");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

