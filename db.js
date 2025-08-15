//const { Pool } = require("pg");

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString:
    "postgresql://root:QydLaw6ciLdoGcVwm8W6Ibcu0oruxWTi@dpg-d2f3gt3uibrs73f81dfg-a.oregon-postgres.render.com/dtbeis_kbe3",
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
