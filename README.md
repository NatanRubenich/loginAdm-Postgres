# 🏥 Sistema de Login e Controle de Acesso - Clínica Vida Saudável

## 💡 Cenário
Vamos criar um sistema simples de login e controle de acesso para uma clínica médica fictícia chamada **Vida Saudável**.  
Teremos três cargos: `admin`, `medico` e `recepcionista`, cada um com diferentes níveis de acesso.

---

## 1️⃣ Pré-requisitos antes da aula

- Node.js e NPM instalados
- PostgreSQL instalado e configurado (usuário: postgres / senha: postgres)
- Editor de código (como VSCode)
- Postman para testes

---

## 2️⃣ Criação do Banco de Dados

📦 **Passo a passo:**

Abra o terminal ou o **pgAdmin** e execute o comando abaixo para criar o banco:

```bash
createdb clinica
```

---

## 3️⃣ Configuração do Projeto Node.js

📁 **Etapas:**

```bash
mkdir clinica-acesso
cd clinica-acesso
npm init -y
```

Instale os pacotes:

```bash
npm install express sequelize pg pg-hstore bcryptjs jsonwebtoken dotenv
```

Crie o arquivo `.env` com o seguinte conteúdo:

```
DB_NAME=clinica
DB_USER=postgres
DB_PASS=postgres
DB_HOST=localhost
JWT_SECRET=clinicaSegura
```

> ✅ Clone este projeto do GitHub e certifique-se de que a estrutura do banco de dados e dos arquivos está correta.

---

## 4️⃣ Criando o Código – Etapa por Etapa com os Alunos

🧱 **Etapa 1: Estrutura inicial de pastas e arquivos**

```bash
mkdir models controllers middleware
touch server.js .env
touch models/index.js models/User.js
touch controllers/authController.js
touch middleware/auth.js
```

---

## 6️⃣ Testando no Postman

### 1. Cadastro de Usuário

- **Método:** `POST`  
- **URL:** `http://localhost:3000/registrar`  
- **Body (JSON):**

```json
{
  "nome": "Dra. Ana",
  "email": "ana@clinica.com",
  "senha": "123456",
  "cargo": "medico"
}
```

> Isso cria um usuário com a senha já criptografada no banco.

---

### 2. Fazer Login

- **Método:** `POST`  
- **URL:** `http://localhost:3000/login`  
- **Body (JSON):**

```json
{
  "email": "ana@clinica.com",
  "senha": "123456"
}
```

---

### ✅ 3. Resposta esperada

Se tudo estiver certo, você receberá uma resposta como:

```json
{
  "message": "Login realizado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> Esse token é o JWT que será usado para acessar rotas protegidas.

---

### ✅ 4. Acessar rota protegida com o token

- **Método:** `GET`  
- **URL:** `http://localhost:3000/painel`  
- **Headers:**

```
Authorization: Bearer SEU_TOKEN_AQUI
```

---

### 🔁 Fluxo Geral

```text
Cadastro → Login → Geração de token → Enviar token em rotas privadas
```

---

🚀 Pronto! Agora você tem um sistema funcional de autenticação e controle de acesso baseado em cargos.