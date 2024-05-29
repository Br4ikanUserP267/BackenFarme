import { pool } from "../db/db.js";
import { v4 as uuidv4 } from 'uuid';

export const getFarms = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Farms WHERE IsDeleted = 0');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const postFarm = async (req, res) => {
    const { Name, Location, PhoneNumber, OwnerName, OwnerLastname, OwnerId, OwnerBirthDate, UserId } = req.body; 
    const Id = uuidv4(); 
    try {
        await pool.query("INSERT INTO Farms (Id, Name, Location, PhoneNumber, OwnerName, OwnerLastname, OwnerId, OwnerBirthDate, UserId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [Id, Name, Location, PhoneNumber, OwnerName, OwnerLastname, OwnerId, OwnerBirthDate, UserId]);
        res.send("Record added successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const getFarmById = async (req, res) => {
    const id = req.params.id;
    try {
        const [farm] = await pool.query("SELECT * FROM Farms WHERE Id = ? AND IsDeleted = 0", [id]);
        if (farm.length > 0) {
            res.json(farm[0]);
        } else {
            res.status(404).send("Farm not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const getFarmsByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const [farms] = await pool.query("SELECT * FROM Farms WHERE UserId = ? AND IsDeleted = 0", [userId]);
        if (farms.length > 0) {
            res.json(farms);
        } else {
            res.status(404).send("No farms found for this user");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const updateFarm = async (req, res) => {
    const id = req.params.id;
    const { Name, Location, PhoneNumber, OwnerName, OwnerLastname, OwnerId, OwnerBirthDate } = req.body; 
    try {
        await pool.query("UPDATE Farms SET Name=?, Location=?, PhoneNumber=?, OwnerName=?, OwnerLastname=?, OwnerId=?, OwnerBirthDate=? WHERE Id=?", [Name, Location, PhoneNumber, OwnerName, OwnerLastname, OwnerId, OwnerBirthDate, id]);
        res.send("Record updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const deleteFarm = async (req, res) => {
    const id = req.params.id;
    try {
        await pool.query("UPDATE Farms SET IsDeleted = 1 WHERE Id=?", [id]);
        res.send("Record deleted successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
