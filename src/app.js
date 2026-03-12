require("dotenv").config();
console.log("JWT:", process.env.JWT_SECRET);

const express = require("express");
const cors = require("cors");
const pool = require("./config/connection");
const authRoutes = require("./routes/auth.routes");

const app = express();


app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({
    status: "API ONLINE",
    message: "Welcome to the SmartRifas API"
  });
});


app.use("/api/auth", authRoutes);



const PORT = process.env.PORT || 8080;

async function startServer() {
  try {

  
    const connection = await pool.getConnection();
    console.log("Banco de dados MySQL conectado!");
    connection.release();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Erro ao conectar no banco:", error.message);
    process.exit(1);
  }
}

startServer();
