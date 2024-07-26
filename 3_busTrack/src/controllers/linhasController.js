import conn from "../config/conn.js";

export const postLinhas = (request, response) => {
  const { nome_linha, numero_linha, itinerario } = request.body;
  // validação
  if (!nome_linha) {
    response.status(400).json({ message: "O nome da linha é obrigatório" });
  }
  if (!numero_linha) {
    response.status(400).json({ message: "O numero_linha é obrigatório" });
  }
  if (!itinerario) {
    response.status(400).json({ message: "O itinerario obrigatório" });
  }

  // checando se linha existe
  const checkSQL = /*sql*/ `SELECT * FROM linhas
    WHERE nome_linha = "${nome_linha}" AND numero_linha = "${numero_linha}" AND itinerario = "${itinerario}"`;

  conn.query(checkSQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar as linhas" });
      return console.log(err);
    }

    if (data.length > 0) {
      response.status(409).json({ message: "linhas já existe" });
      return console.log(err);
    }
    const insertSQL = /*sql*/ `INSERT INTO linhas (nome_linha,numero_linha,itinerario) VALUES ("${nome_linha}","${numero_linha}","${itinerario}")`;

    conn.query(insertSQL, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastrar linha" });
        return console.log(err);
      }
      response.status(201).json({ message: "linha cadastrada" });
    });
  });
};

export const postMotoristas = (request, response) => {
  const { nome, data_nascimento, numero_carteira_habilitacao } = request.body;
  // validação
  if (!nome) {
    response.status(400).json({ message: "O nome é obrigatório" });
  }
  if (!data_nascimento) {
    response.status(400).json({ message: "O data_nascimento é obrigatório" });
  }
  if (!numero_carteira_habilitacao) {
    response.status(400).json({ message: "O numero_carteira_habilitacao obrigatório" });
  }

  // checando se linha existe
  const checkSQL = /*sql*/ `SELECT * FROM motoristas
    WHERE nome = "${nome}" AND data_nascimento = "${data_nascimento}" AND numero_carteira_habilitacao = "${numero_carteira_habilitacao}"`;

  conn.query(checkSQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar as motoristas" });
      return console.log(err);
    }

    if (data.length > 0) {
      response.status(409).json({ message: "motoristas já existe" });
      return console.log(err);
    }
    const insertSQL = /*sql*/ `INSERT INTO motoristas (nome,data_nascimento,numero_carteira_habilitacao) VALUES ("${nome}","${data_nascimento}","${numero_carteira_habilitacao}")`;

    conn.query(insertSQL, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastrar linha" });
        return console.log(err);
      }
      response.status(201).json({ message: "motorista cadastrado" });
    });
  });
};

export const postOnibus = (request, response) => {
  const { placa, modelo, ano_fabricacao,capacidade,id_linha,id_motorista } = request.body;
  // validação
  if (!placa) {
    response.status(400).json({ message: "O placa é obrigatório" });
  }
  if (!modelo) {
    response.status(400).json({ message: "O modelo é obrigatório" });
  }
  if (!ano_fabricacao) {
    response.status(400).json({ message: "O ano_fabricacao obrigatório" });
  }
  if (!capacidade) {
    response.status(400).json({ message: "O capacidade obrigatório" });
  }
  if (!id_linha) {
    response.status(400).json({ message: "O id_linha obrigatório" });
  }
  if (!id_motorista) {
    response.status(400).json({ message: "O id_motorista obrigatório" });
  }

  // checando se linha existe
  const checkSQL = /*sql*/ `SELECT * FROM Onibus
    WHERE placa = "${placa}" AND modelo = "${modelo}" AND capacidade = "${capacidade}"`;

  conn.query(checkSQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar as Onibus" });
      return console.log(err);
    }

    if (data.length > 0) {
      response.status(409).json({ message: "Onibus já existe" });
      return console.log(err);
    }
    const insertSQL = /*sql*/ `INSERT INTO onibus (placa,modelo,ano_fabricacao,capacidade,id_linha,id_motorista) VALUES ("${placa}","${modelo}","${ano_fabricacao}","${capacidade}","${id_linha}","${id_motorista}")`;

    conn.query(insertSQL, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastrar linha" });
        return console.log(err);
      }
      response.status(201).json({ message: "onibus cadastrado" });
    });
  });
};
export const getLinhas = (request, response)=>{
  const { id } = request.params;
  const SQL = /*sql*/ `SELECT * FROM linhas WHERE id = "${id}"`;

  conn.query(SQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao listar linhas" });
      return console.log(err);
    }
    const linhas = data;
    if (linhas.length === 0) {
      response
        .status(404)
        .json({ message: "Nao existe linhas cadastradas" });
      return;
    }
    response.status(200).json(linhas);
  });
}
export const getMotoristas = (request, response)=>{
  const { id } = request.params;
  const SQL = /*sql*/ `SELECT * FROM motoristas WHERE id = "${id}"`;

  conn.query(SQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao motoristas linhas" });
      return console.log(err);
    }
    const motoristas = data;
    if (motoristas.length === 0) {
      response
        .status(404)
        .json({ message: "Nao existe motoristas cadastradas" });
      return;
    }
    response.status(200).json(motoristas);
  });
}
export const getOnibus = (request, response)=>{
  const { id } = request.params;
  const SQL = /*sql*/ `SELECT * FROM onibus WHERE id = "${id}"`;

  conn.query(SQL, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao onibus linhas" });
      return console.log(err);
    }
    const onibus = data;
    if (onibus.length === 0) {
      response
        .status(404)
        .json({ message: "Nao existe onibus cadastradas" });
      return;
    }
    response.status(200).json(onibus);
  });
