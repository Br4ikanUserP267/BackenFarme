import { pool } from "../db/db.js";

// Método GET para obtener todos los registros
export const getFarms = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Farms')
        res.json(rows)
    } catch (err) {
      console.error(err);
      res.status(500).send("Error de servidor");
    }
  }
  

// Método POST para agregar un nuevo registro
// Método POST para agregar un nuevo registro
export const postFarm = async (req, res) => {
    const { Id,Name, Location, PhoneNumber, OwnerName, OwnerLastname, OwnerId, OwenerBirthDate } = req.body; // Corregir OwenerBirthDate
    try {
      await pool.query("INSERT INTO Farms (Id, Name, Location, PhoneNumber, OwnerName, OwnerLastname, OwnerId, OwenerBirthDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [Id,Name, Location, PhoneNumber, OwnerName, OwnerLastname, OwnerId, OwenerBirthDate]); // Corregir OwenerBirthDate
      res.send("Registro agregado correctamente");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error de servidor");
    }
  }
  
// Método GET para obtener una granja por su ID
export const getFarmById = async (req, res) => {
    const id = req.params.id;
    try {
      const farm = await pool.query("SELECT * FROM Farms WHERE Id = ?", [id]);
      if (farm.length > 0) {
        res.json(farm[0]);
      } else {
        res.status(404).send("Granja no encontrada");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error de servidor");
    }
  }
  

// Método PUT para actualizar un registro
export const updateFarm = async (req, res) => {
    const id = req.params.id;
    const { Name, Location, PhoneNumber, OwnerName, OwnerLastname, OwnerId, OwenerBirthDate } = req.body; // Corregir OwenerBirthDate
    try {
      await pool.query("UPDATE Farms SET Name=?, Location=?, PhoneNumber=?, OwnerName=?, OwnerLastname=?, OwnerId=?, OwenerBirthDate=? WHERE Id=?", [Name, Location, PhoneNumber, OwnerName, OwnerLastname, OwnerId, OwenerBirthDate, id]); // Corregir OwenerBirthDate
      res.send("Registro actualizado correctamente");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error de servidor");
    }
  }
  

// Método DELETE para eliminar un registro
export const deleteFarm = async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM Farms WHERE Id=?", [id]);
    res.send("Registro eliminado correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error de servidor");
  }
}

