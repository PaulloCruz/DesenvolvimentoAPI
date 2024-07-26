import "dotenv/config";
import express, { json, response } from "express";
import mysql from "mysql2";
import { v4 as uuidv4 } from "uuid";

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sen@iDev77!.",
  database: "funcionarios",
  port: 3306,
});

conn.connect((err) => {
  if (err) {
    console.log(err.stack);
  }
  console.log("MySQL Conectado");
});

app.get("/funcionarios", (request, response) => {
  const sql = "SELECT * FROM funcionarios";
  conn.query(sql, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar os funcionários" });
      return console.log(err);
    }
    const funcionarios = data;
    // console.log(data)
    // console.log(typeof data)
    response.status(200).json(funcionarios);
  });
});

//cadastrar funcionário
app.post("/funcionarios", (request, response) => {
  const { nome, cargo, data_contratacao, salario, email } = request.body;

  //validação

  if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório" });
  }
  if (!cargo) {
    response.status(400).json({ message: "O cargo é obrigatório" });
  }
  if (!data_contratacao) {
    response.status(400).json({ message: "O data_contratacao é obrigatório" });
  }
  if (!salario) {
    response.status(400).json({ message: "O salario é obrigatório" });
  }
  if (!email.includes("@")) {
    response.status(422).json({ message: "O email é obrigatório" });
  }

  const checkSQL = `SELECT * FROM funcionarios WHERE email = "${email}"`;

  conn.query(checkSQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar os funcionarios" });
      return console.log(err);
    }

    if (data.length > 0) {
      response.status(409).json({ message: "funcionário já existe" });
      return console.log(err);
    }
    const id = uuidv4();
    const insertSQL = `INSERT INTO funcionarios (id, nome, cargo, data_contratacao, salario, email) VALUES ("${id}","${nome}","${cargo}","${data_contratacao}","${salario}","${email}")`;

    conn.query(insertSQL, (err) => {
      if (err) {
        response
          .status(500)
          .json({ message: "Erro ao cadastrar o funcionário" });
        return console.log(err);
      }
      response.status(201).json({ message: "funcionário cadastrado" });
    });
  });
});

//listar um funcionário
app.get("/funcionarios/:id", (request, response) => {
  const { id } = request.params;

  const sql = `SELECT * FROM funcionarios WHERE id = "${id}"`;
  conn.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Erro ao buscar um funcionário" });
      return;
    }

    if (data.length === 0) {
      response.status(404).json({ message: "Funcionário não encontrado" });
      return;
    }
    const funcionario = data[0];
    response.status(200).json(funcionario);
  });
});

app.put("/funcionarios/:id", (request, response) => {
  const { nome, cargo, data_contratacao, salario, email } = request.body;
  const { id } = request.params;

  //validação

  if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório" });
    return;
  }
  if (!cargo) {
    response.status(400).json({ message: "O cargo é obrigatório" });
    return;
  }
  if (!data_contratacao) {
    response.status(400).json({ message: "O data_contratacao é obrigatório" });
    return;
  }
  if (!salario) {
    response.status(400).json({ message: "O salario é obrigatório" });
    return;
  }
  if (!email.includes("@")) {
    response.status(400).json({ message: "O email é obrigatório" });
    return;
  }

  const checkSQL = `SELECT * FROM funcionarios WHERE id = "${id}"`;

  conn.query(checkSQL, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Funcionário não encontrado" });
      return;
    }

    if (data.length === 0) {
      response.status(404).json({ message: "funcionário não encontrado" });
      return;
    }
  });
  const checkEmail = `SELECT * FROM funcionarios WHERE email = "${email}"`;
  conn.query(checkEmail, (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ message: "Funcionário não encontrado" });
      return;
    }

    if (data.length > 0) {
      return response.status(409).json({ message: "Email já existe" });
    }
  });

  const updateSql = `UPDATE funcionarios SET nome = "${nome}",cargo = "${cargo}",data_contratacao = "${data_contratacao}", salario = "${salario}" ,email = "${email}" WHERE id = "${id}"`;

  conn.query(updateSql, (err) => {
    if (err) {
      console.error(err);
      return response
        .status(500)
        .json({ message: "Erro ao atualizar funcionário " });
    }
    response.status(200).json({ message: "funcionário atualizado" });
  });
});

app.delete("/funcionarios/:id", (request, response) => {
  const { id } = request.params;
  const deleteSQL = `DELETE FROM funcionarios`;
  conn.query(deleteSQL, (err, info) => {
    if (err) {
      response
        .status(500)
        .json({ message: "Erro ao deletar um funcionário do banco de dados" });
      return;
    }
    if (info.affectedRows === 0) {
      response.status(404).json({ message: "Funcionário não encontrado" });
      return;
    }
    response
      .status(200)
      .json({ message: "Funcionário excluido do banco de dados" });
  });
});
app.use((request, response) => {
  response.status(404).join({ message: "Rota não encontrada" });
});

app.listen(PORT, () => {
  console.log("Servidor on PORT" + PORT);
});
