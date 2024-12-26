# API Food Explorer

Esta API gerencia pratos de um restaurante, permitindo criar, atualizar, listar, deletar e consultar informações sobre pratos, ingredientes, usuários e autenticação. Criada para avaliação no desafio final da formação explorer da rocketseat

## Funcionalidades

### **Pratos**

- **Criar prato** (`POST /foods`): Cria um novo prato com título, descrição, preço, categoria, ícone e ingredientes.
- **Listar pratos** (`GET /foods`): Lista todos os pratos ou busca por nome do prato ou ingrediente.
- **Detalhar prato** (`GET /foods/:id`): Exibe informações completas de um prato, incluindo seus ingredientes.
- **Atualizar prato** (`PUT /foods/:id`): Atualiza as informações de um prato existente.
- **Deletar prato** (`DELETE /foods/:id`): Remove um prato do banco de dados.

### **Ingredientes**

- **Adicionar ingrediente** (`POST /ingredients`): Adiciona um ingrediente a um prato.
- **Deletar ingrediente** (`DELETE /ingredients/:id`): Remove um ingrediente de um prato.

### **Ícones de pratos**

- **Criar ícone de prato** (`POST /foods/icon`): Faz upload de um ícone para um prato.
- **Atualizar ícone de prato** (`PUT /foods/icon/:id`): Atualiza o ícone de um prato existente.

### **Usuários e Autenticação**

- **Criar usuário** (`POST /users`): Registra um novo usuário.
- **Login** (`POST /sessions`): Realiza o login do usuário e gera um token JWT.
- **Validar usuário** (`GET /users/validated`): Verifica se o usuário está autenticado.

## Rotas da API

### **Pratos** (`/foods`)

- **POST** `/`: Cria um novo prato (somente administradores).
- **GET** `/:id`: Exibe detalhes de um prato específico.
- **GET** `/`: Lista todos os pratos ou realiza busca por nome e ingredientes.
- **DELETE** `/:id`: Deleta um prato (somente administradores).
- **PATCH** `/:id`: Atualiza um prato (somente administradores).
- **PUT** `/icon/:id`: Atualiza o ícone de um prato (somente administradores).
- **POST** `/icon`: Cria um ícone para um prato (somente administradores).

### **Ingredientes** (`/ingredients`)

- **POST** `/`: Adiciona um ingrediente a um prato.
- **DELETE** `/:id`: Remove um ingrediente.

### **Sessões** (`/sessions`)

- **POST** `/`: Realiza login e gera um token JWT.

### **Usuários** (`/users`)

- **POST** `/`: Registra um novo usuário.

## Middlewares

- **ensureAuthenticated**: Verifica se o usuário está autenticado.
- **userAuthorization**: Garante que o usuário tenha permissões adequadas (somente administradores).

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Knex.js**: SQL query builder.
- **bcryptjs**: Criptografia de senhas.
- **jsonwebtoken**: Geração de tokens JWT.
- **Multer**: Upload de arquivos (ícones).

## Como Rodar

1. Clone o repositório.

2. Instale as dependências:

   ```
   npm install
   ```

3. Configure seu banco de dados e as variáveis de ambiente seguindo env.example.

4. Rode a aplicação:

   ```
   npm start
   ```
## Site da aplicação
https://desafio-final-explorer.netlify.app/

Para logar como admin use: o email leo@gmail.com e senha: leo123
## Autor

Leonardo Santos
