const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Usar body-parser para processar os dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados SQLite
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Banco de dados SQLite conectado!');
  }
});

// Criar a tabela de contatos, se não existir
db.run(`CREATE TABLE IF NOT EXISTS contatos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email TEXT,
  mensagem TEXT
)`);

// Rota para a página inicial
app.get('/', (req, res) => {
  res.render('index', { title: 'Página Inicial' });
});

// Rota para a página de contato
app.get('/contato', (req, res) => {
  // Listar contatos do banco de dados
  db.all('SELECT * FROM contatos', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao carregar contatos');
    } else {
      res.render('contato', { title: 'Página de Contato', contatos: rows });
    }
  });
});

// Rota para salvar um contato no banco de dados
app.post('/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;
  const sql = `INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)`;
  db.run(sql, [nome, email, mensagem], (err) => {
    if (err) {
      console.error('Erro ao salvar contato:', err.message);
      res.status(500).send('Erro ao salvar contato');
    } else {
      res.redirect('/contato');
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
