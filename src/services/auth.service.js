const pool = require("../config/connection");
const bcrypt = require("bcrypt");

async function register(email, password) {
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  const [existingUser] = await pool.query(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (existingUser.length > 0) {
    throw new Error("Usuário já existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword]
  );

  return { message: "Usuário criado com sucesso" };
}


async function login(email, password) {
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios");
  }

  const [rows] = await pool.query(
    "SELECT id, email, password FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) {
    throw new Error("Usuário não encontrado");
  }

  const user = rows[0];

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Senha inválida");
  }

  delete user.password;

  return user;
}

module.exports = {
  register,
  login
};