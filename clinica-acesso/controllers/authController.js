const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Rota de registro de novo usuário
exports.registrar = async (req, res) => {
  try {
    const { nome, email, senha, cargo } = req.body;

    // Cria e salva o usuário no banco
    const novoUsuario = await User.create({ nome, email, senha, cargo });

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuario: novoUsuario
    });
  } catch (err) {
     // Em caso de erro (ex: email duplicado), retorna erro 500
    res.status(400).json({
      erro: 'Erro ao criar usuário',
      detalhes: err.message
    });
  }
};

// Rota de login
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  // Busca usuário pelo e-mail
  const usuario = await User.findOne({ where: { email } });

  // Verifica se encontrou e compara senha
  if (!usuario || !(await bcrypt.compare(senha, usuario.senha)))
    return res.status(401).json({ erro: 'Credenciais inválidas' });

  // Cria token JWT com ID, nome e cargo
  const token = jwt.sign({
    id: usuario.id,
    nome: usuario.nome,
    cargo: usuario.cargo
  }, process.env.JWT_SECRET);

  // Retorna mensagem de sucesso e o token
  res.json({
    mensagem: 'Login bem-sucedido',
    token
  });
};
