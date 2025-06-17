const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega variáveis do .env

// Cria conexão com o PostgreSQL usando Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
);

// Exporta a instância do banco e os modelos
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require('./User')(sequelize, Sequelize);

module.exports = db;
