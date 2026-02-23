# AuthAPI

API de autenticação com Node.js, Express e JWT, pronta para uso em projetos e aprendizado.

---

## 🚀 Tecnologias

- Node.js
- Express
- JSON Web Tokens (JWT)
- Bcrypt (hash de senhas)
- Helmet (segurança de headers)
- CORS
- Morgan (logs)
- Dotenv (variáveis de ambiente)

---

## 📂 Estrutura do projeto


AuthAPI/
├── src/
│ ├── routes/
│ │ └── auth.routes.js
│ ├── controllers/
│ │ └── auth.controller.js
│ ├── services/
│ │ └── auth.service.js
│ ├── middlewares/
│ │ └── auth.middleware.js
├── app.js
├── package.json
├── package-lock.json
└── .env


---

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/wesleydev-create/AuthAPI.git
cd AuthAPI

Instale as dependências:

npm install

Crie um arquivo .env na raiz:

SECRET=sua_chave_super_secreta
PORT=8080

Inicie o servidor em modo desenvolvimento:

npm run dev

Servidor rodando em http://localhost:8080

🔥 Rotas da API
1️⃣ Registro de usuário
POST /api/v1/auth/register

Body (JSON):

{
  "email": "teste@email.com",
  "password": "123456"
}

Resposta:

{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "id": 1,
    "email": "teste@email.com"
  }
}
2️⃣ Login
POST /api/v1/auth/login

Body (JSON):

{
  "email": "teste@email.com",
  "password": "123456"
}

Resposta:

{
  "success": true,
  "token": "SEU_JWT_TOKEN"
}
3️⃣ Perfil do usuário (protegido)
GET /api/v1/auth/me

Headers:

Authorization: Bearer SEU_JWT_TOKEN

Resposta:

{
  "success": true,
  "user": {
    "id": 1,
    "email": "teste@email.com",
    "iat": 123456789,
    "exp": 123456789
  }
}
🛠️ Funcionalidades

Registro de usuário com senha hash

Login com JWT

Middleware de autenticação

Estrutura organizada por rotas, controllers, services e middlewares

Segurança básica com Helmet e CORS

Logs de requisições com Morgan

Versionamento da API (/api/v1/)

💡 Próximos passos para produção

Trocar let users = [] por banco de dados (MongoDB ou PostgreSQL)

Adicionar refresh tokens

Criar testes automatizados

Deploy em Render, Railway ou AWS

📌 Autor

Wesley Rafael Dias Gomes
GitHub
