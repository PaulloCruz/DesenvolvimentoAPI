import "dotenv/config"; //* ele vai ser executado assim que iniciar o servidor
import express, { response } from "express";
import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT;

const app = express();

app.use(express.json()); //midleware

//*Criar conexão com o banco de dados MYSQL

const conn = mysql.createConnection({
  //conexões necessarias para estabelecer conexão
  //(essas são as informações do banco de dados no mysql)
  host: "localhost",
  user: "root",
  password: "Sen@iDev77!.",
  database: "livraria",
  port: 3306,
});
// Conectar ao banco de dados
conn.connect((err) => {
  if (err) {
    return console.error(err.stack); //stack é exatamente o que aconteceu
  }
  console.log("Mysql Conectado");
});

app.get("/livros", (request, response) => {
  response.send("Ola, Mundo!");
});

//Rota 404
app.use((request,response)=>{
    response.status(404).json({message: "Rota não encontrada"})
})




app.listen(PORT, () => {
  console.log("servidor on port");
});
