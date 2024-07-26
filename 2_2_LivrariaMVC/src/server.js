import "dotenv/config";
import express from "express";

//* conexão com banco de dados

//* Importação dos modulos e criação das tabelas
import "./models/livroModel.js";
import "./models/funcionarioModel.js";
import "./models/clienteModel.js";
import "./models/emprestimosModel.js"

//* Importação das ROTAS
import livroRoutes from "./routes/LivrosRoutes.js";

const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//* Utilização das ROTAS

app.use("/livros", livroRoutes);

app.listen(PORT, () => {
  console.log("serv on port", PORT);
});
