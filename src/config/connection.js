const mysql = require("mysql2");

console.log("Iniciando conexão");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "auth_db",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); 

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(" banco de dados conectado com sucesso!");
    connection.release();
  } catch (error) {
    console.error(" Erro ao conectar com o banco:");
    console.error(error.message);
    process.exit(1); 
  }
}

testConnection();

module.exports = pool;