require("dotenv").config();
const mysql = require("mysql2/promise");

console.log("Iniciando conexão");

const pool = mysql.createPool({
  host:     process.env.MARIADB_HOST     || process.env.DB_HOST     || "localhost",
  user:     process.env.MARIADB_USER     || process.env.DB_USER     || "root",
  password: process.env.MARIADB_PASSWORD || process.env.DB_PASSWORD || "25351529",
  database: process.env.MARIADB_DATABASE || process.env.DB_NAME     || "railway",
  port:     Number(process.env.MARIADB_PORT || process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: "utf8mb4",
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Banco conectado! Host:", process.env.MARIADB_HOST);
    console.log("Database:", process.env.MARIADB_DATABASE);
    connection.release();
  } catch (error) {
    console.error("Erro ao conectar com o banco:", error.message);
    process.exit(1);
  }
}

testConnection();

module.exports = pool;
