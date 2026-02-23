require("dotenv").config();
const express = require("express");
const pool = require("./config/connection");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());
app.use("/api", authRoutes);

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await pool.getConnection();
    console.log(" banco de dados mysql conectado!");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error(" servidor não conseguiu conectar com o mysql:", error.message);
  }
}

startServer();