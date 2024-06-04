# Projeto Dictonary Challenge

## Descrição
Este é um projeto realizado para pesquisar e gerenciar palavras do dicionário, onde o usuário pode ver seu histórico de pesquisa e favoritar palavras.
 
> This is a challenge by [Coodesh](https://coodesh.com/)

A descrição do desafio pode ser encontrada [aqui](https://github.com/k1y05h17k/projectDictionary/main/challenge_description.md).

## Tecnologias utilizadas
- Node.js 
- Express 
- MongoDB 
- Mongoose 
- Nodemon
- Bcrypt
- Axios
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

## Como testar a API com o Postman

1. Abra o Postman e crie um novo ambiente (opcional) com a variável `{{base_url}}` configurada para http://localhost:3000/api/v1/
2. Para criar um novo usuário:
    - Tipo de requisição: POST
    - URL: {{base_url}}/auth/signup
    - Body:
        ````  json  
        {   
            "name": "Users 1wss",
            "email": "1exsdasdaample@email.com",
            "password": "testxxxx",
            "passwordConfirm": "testxxxx"
        }
        ````
3. Na opção de script, adicione o código abaixo, para adicionar jwt nas variáveis de ambiente e usar na opção de autenticação Bearer:

````
    pm.environment.set("jwt", pm.response.json().token);
````

4. Para login usuário:
    - Tipo de requisição: POST
    - URL: {{base_url}}/auth/signin
    - Body:
        ```` json
        { 
            "email": "1exsdasdaample@email.com",
            "password": "testxxxx",
        }
        ````






