require("dotenv").config();

const express = require("express");
const cors    = require("cors");
const pool    = require("./config/connection");
const authRoutes = require("./routes/auth.routes");

const app = express();

// ── CORS ─────────────────────────────────────────────────────────────────────
// Aceita qualquer origem — ajuste para sua URL de produção se quiser restringir
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, // deve ser false quando origin é "*"
}));

app.options("*", cors()); // responde preflight de todas as rotas

// ── Body parsers ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Rota raiz ─────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status:  "API ONLINE",
    message: "Welcome to the SmartRifas API",
  });
});

// ── Rotas ─────────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);

// ── Start ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log("Banco de dados MySQL conectado!");
    connection.release();

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao conectar no banco:", error.message);
    process.exit(1);
  }
}

startServer();
