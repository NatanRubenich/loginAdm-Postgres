const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    nome: DataTypes.STRING, // Nome do usuário
    email: { 
      type: DataTypes.STRING,
      unique: true // Garante que o e-mail não se repita
    },
    senha: DataTypes.STRING, // Senha que será criptografada
    cargo: {
      // Enum para cargos permitidos
      type: DataTypes.ENUM('admin', 'medico', 'recepcionista'),
      defaultValue: 'recepcionista' // padrão ao criar usuário
    }
  });

// Hook que executa antes de criar um usuário
// Usado para criptografar a senha antes de salvar no banc
  // Antes de salvar o usuário, criptografa a senha
  User.beforeCreate(async (user) => {
    user.senha = await bcrypt.hash(user.senha, 10);  // Criptografa a senha
  }); 

  return User;
};
