const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Banco de dados
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
  if (err) console.error('Erro ao conectar ao banco:', err.message);
});

// Criação da tabela
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  numero TEXT NOT NULL
)`);

// Rotas
app.get('/', (req, res) => res.redirect('/usuarios'));

app.get('/usuarios', (req, res) => {
  db.all('SELECT * FROM usuarios', (err, rows) => {
    if (err) return res.status(500).send('Erro ao listar usuários');
    res.render('usuarios', { usuarios: rows });
  });
});

app.get('/usuarios/novo', (req, res) => {
  res.render('novo');
});

app.post('/usuarios', (req, res) => {
  const { nome, email, numero } = req.body;
  db.run('INSERT INTO usuarios (nome, email, numero) VALUES (?, ?, ?)', [nome, email, numero], (err) => {
    if (err) return res.status(500).send('Erro ao adicionar usuário');
    res.redirect('/usuarios');
  });
});

app.post('/usuarios/editar/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, numero } = req.body;
  db.run('UPDATE usuarios SET nome = ?, email = ?, numero = ? WHERE id = ?', [nome, email, numero, id], (err) => {
    if (err) return res.status(500).send('Erro ao editar usuário');
    res.redirect('/usuarios');
  });
});

app.post('/usuarios/excluir/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Erro ao excluir usuário');
    res.redirect('/usuarios');
  });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
