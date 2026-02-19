const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

let users = [];

function generateToken(user) {
  if (!process.env.SECRET) {
    throw new Error("SECRET não definido");
  }

  return jwt.sign(
    { email: user.email },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
}

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email e senha são obrigatórios"
      });
    }

    const userExists = users.find(user => user.email === email);

    if (userExists) {
      return res.status(409).json({
        error: "Usuário já existe"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      email,
      password: hashedPassword
    };

    users.push(newUser);

    return res.status(201).json({
      message: "Usuário criado com sucesso"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email e senha são obrigatórios"
      });
    }

    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({
        error: "Credenciais inválidas"
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        error: "Credenciais inválidas"
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      accessToken: token,
      expiresIn: "1h"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Erro interno do servidor"
    });
  }
});

module.exports = router;
