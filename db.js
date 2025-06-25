//const { Pool } = require("pg");

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgresql://root:2lEBwmPGBlMgqlx7O4VvgFcEXP63GwTD@dpg-d0vknoggjchc7388rf40-a.oregon-postgres.render.com/databeis",
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;

// Test the connection to the database
/*
async function testConection() {
  try {
    const client = await pool.connect();
    console.log("Conexion exitosa");
    client.release();
    await pool.end();
  } catch (err) {
    console.err("Error al conectar", err);
  }
}

testConection();*/
