import pool from "./db.js";
import express from "express";
import cors from "cors";

const app = express();
//const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/create-data-table", async (req, res) => {
  try {
    const tableName = "data";

    const checkTable = await pool.query(`SELECT to_regclass($1) AS exists`, [
      tableName,
    ]);

    if (!checkTable.rows[0].exists) {
      await pool.query(`
        CREATE TABLE ${tableName} (
          id SERIAL PRIMARY KEY,
          value TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      return res.status(201).json({ message: "✅ Tabla creada exitosamente" });
    } else {
      return res.status(200).json({ message: "ℹLa tabla ya existe" });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

//borrar tabla
app.delete("/delete-data-table", async (req, res) => {
  try {
    const tableName = "data";

    const checkTable = await pool.query(`SELECT to_regclass($1) AS exists`, [
      tableName,
    ]);

    if (checkTable.rows[0].exists) {
      await pool.query(`
        DROP TABLE ${tableName};
      `);

      return res
        .status(201)
        .json({ message: "✅ Tabla se ha eliminado exitosamente" });
    } else {
      return res.status(200).json({ message: "ℹLa tabla no existe" });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

//guadar datos en laa tabla
app.post("/savedata", async (req, res) => {
  const tableName = "data";
  const { id, value } = req.body;
  console.log("entra");
  try {
    await pool.query(`INSERT INTO ${tableName}(value) VALUES($1)`, [value]);

    return res
      .status(201)
      .json({ message: "✅ Datos insertados exitosamente" });
  } catch (err) {
    res.status(500).json({
      error: "Error al procesar la solicitud",
    });
  }
});

//examen unidad 1

app.post("/create-data-table-alumno", async (req, res) => {
  try {
    const tableName = "alumno";

    const checkTable = await pool.query(`SELECT to_regclass($1) AS exists`, [
      tableName,
    ]);

    if (!checkTable.rows[0].exists) {
      await pool.query(`
        CREATE TABLE ${tableName} (
          id SERIAL PRIMARY KEY,
          nombre TEXT,
          matricula INT, 
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      return res
        .status(201)
        .json({ message: "✅ alumno table created succesfully" });
    } else {
      return res
        .status(200)
        .json({ message: "ℹ the alumno table already exists" });
    }
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error processing request" });
  }
});
//endpoint
app.post("/save-data-alumno", async (req, res) => {
  const tableName = "alumno";
  const { nombre, matricula } = req.body;
  console.log("entra");
  try {
    await pool.query(
      `INSERT INTO ${tableName}(nombre,matricula) VALUES($1,$2)`,
      [nombre, matricula]
    );

    return res.status(201).json({ message: "✅ Data inserted correctly" });
  } catch (err) {
    res.status(500).json({
      error: "Error processing request",
    });
  }
});
////////////////////////////////////////
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto, ${PORT}`);
});

app.get("/Nana", (req, res) => {
  res.json({ nombre: "Nana", apellido: "Osaki" });
});

app.get("/velocidad", (req, res) => {
  res.json({ nombre: "Nubia", apellido: "sanchez" });
});

app.get("/temperatura", (req, res) => {
  res.json({ valor: "10°C", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`servidor corriendo en puerto ${PORT}`);
});
