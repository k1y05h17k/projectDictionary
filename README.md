# Projeto Dictonary Challenge

## Descrição
Este é um projeto realizado para pesquisar e gerenciar palavras do dicionário, onde o usuário pode ver seu histórico de pesquisa e favoritar palavras.
 
> This is a challenge by [Coodesh](https://coodesh.com/)

A descrição do desafio pode ser encontrada [aqui](https://github.com/k1y05h17k/projeto).

## Tecnologias utilizadas
- Node.js 
- Express 
- MongoDB 
- Mongoose 
- Nodemon
- Bcrypt
- jwt

## Estrutura de Diretórios

````
├── controllers
    ├── authController.js
    ├── dictionaryController.js
    ├── errorController.js
    ├── favoriteController.js
    ├── historyController.js
    ├── userController.js
├── data
    ├── importData.js
├── models
    ├── dictionaryModel.js
    ├── favoriteModel.js
    ├── historyModel.js
    ├── userModel.js
├── routes
    ├── authRoutes.js
    ├── dictionaryRoutes.js
    ├── favoriteRoutes.js
    ├── historyRoutes.js
    ├── userRoutes.js
├── utils
    ├── apiFeatures.js
    ├── appError.js
    ├── catchAsync.js
apps.js
server.js
config.env
package.json  
````
    
## Como rodar

Para instalar as dependências
````
npm install
````

Para rodar a aplicação
````
npm run start
````

## Como testar API com o Postman
````
Para testar a API, você pode usar o Postman:
````
1. Abra o Postman e crie um novo ambiente (opcional) com a variável {{base_url}} configurada para http://localhost:3000/api/v1/
````
2. Criar Requisição POST para Cadastrar um novo usuário:

    URL: {{base_url}}/auth/signin
````

3. Na definição do body, seleione raw e JSON:
    
    { 
    
    "name": "Users 1wss",
    "email": "1exsdasdaample@email.com",
    "password": "testxxxx",
    "passwordConfirm": "testxxxx"

    }
4. Na opção de script, adicione o código abaixo, para adicionar jwt nas variaveis de ambiente e usar na opção de autenticação Bearer: 
````
    pm.environment.set("jwt", pm.response.json().token);
````


2. Criar Requisição POST para login usuário:

    URL: {{base_url}}/auth/signin
````

3. Na definição do body, seleione raw e JSON:
    
    { 

    "email": "1exsdasdaample@email.com",
    "password": "testxxxx",

    }
 






