const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/velocidad", (req, res) => {
  res.json({ nombre: "Nubia", apellido: "sanchez" });
});

app.get("/temperatura", (req, res) => {
  res.json({ valor: "10°C", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`servidor corriendo en puerto ${PORT}`);
});
