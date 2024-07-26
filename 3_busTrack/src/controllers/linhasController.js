import conn from "../config/conn";

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
    const insertSQL = /*sql*/ `INSERT INTO linhas
    (nome_linha,numero_linha,itinerario)
    VALUES
    ("${nome_linha}","${numero_linha}","${itinerario}",)`;

    conn.query(insertSQL, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastrar linha" });
        return console.log(err);
      }
      response.status(201).json({ message: "linha cadastrada" });
    });
  });
};
