# API do Projeto da Lista de Tarefas

## Tecnologias Utilizadas

- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) **Express**: Framework para Node.js que facilita o desenvolvimento de APIs.
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) **Node.js**: Ambiente de execução para JavaScript no servidor.
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB**: Banco de dados NoSQL para armazenamento de dados.

## Descrição

Este projeto é uma API para uma lista de tarefas, permitindo a criação, leitura, atualização e exclusão de tarefas. A API é desenvolvida utilizando Node.js com o framework Express e armazena os dados em um banco de dados MongoDB.

## Endpoints

- `GET /user` - Obtém o usuário de acordo com o token fornecido.
- `GET /user/:id` - Obtém um usuário a partir do seu id.
- `POST /user` - Cria um novo usuário.
- `PUT /user/:id` - Atualiza um usuário a partir do seu id.
- `DELETE /user/:id` - Exclui um usuário a partir do seu id.
- `POST /login` - Realiza o login do usuário.

## Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/albierygs/toDo-list-api.git

2. Navegue até o diretório do projeto:
   ```bash
   cd toDo-list-api

3. Instale as dependências:
   ```bash
   npm install

4. Inicie o servidor:
   ```bash
   npm start