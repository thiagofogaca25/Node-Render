const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a página inicial
app.get('/', (req, res) => {
  res.render('index', { title: 'Página Inicial' });
});

// Rota para a página de contato
app.get('/contato', (req, res) => {
  res.render('contato', { title: 'Página de Contato' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
