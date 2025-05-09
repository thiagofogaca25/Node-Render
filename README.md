# 🧪 Projeto Teste Render - CRUD com Node.js, Express, EJS e SQLite

Este é um projeto simples de cadastro de usuários utilizando Node.js com Express, SQLite como banco de dados e EJS para renderização de páginas. A aplicação possui páginas para **listar, adicionar, editar e excluir usuários**, com deploy possível no [Render](https://render.com).

---

## 🚀 Funcionalidades

- Listar usuários
- Adicionar novo usuário
- Editar usuário existente
- Excluir usuário
- Interface responsiva com EJS
- Banco de dados SQLite

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- EJS
- SQLite3
- HTML + CSS (puro)

---

## 🧑‍💻 Como usar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
````

### 2. Instale as dependências

```bash
npm install
```

### 3. Rode o projeto localmente

```bash
node index.js
```

Acesse em: `http://localhost:3000`

---

## 🗂️ Estrutura do Projeto

```
.
├── views/               # Páginas EJS
│   ├── partials/        # Cabeçalho compartilhado
│   ├── usuarios.ejs     # Lista de usuários
│   └── novo.ejs         # Página de novo usuário
├── public/              # Arquivos estáticos (CSS)
│   └── style.css
├── database.js          # Conexão com o SQLite
├── index.js             # Arquivo principal do servidor
└── package.json
```

---

## 🌐 Deploy no Render

1. Crie um repositório no GitHub e suba o projeto.
2. Acesse [Render.com](https://render.com), conecte sua conta GitHub.
3. Crie um novo **Web Service** e selecione:

   * Start command: `node index.js`
   * Build command: `npm install`
   * Environment: Node
