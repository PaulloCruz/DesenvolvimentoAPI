export const cadastrarLivros = (request, response) => {
  const { cliente_id, livro_id, data_emprestimo, data_devolucao } =
    request.body;
  //validação
  if (!cliente_id) {
    response.status(400).json({ message: "O título é obrigatório" });
  }
  if (!livro_id) {
    response.status(400).json({ message: "O autor é obrigatório" });
  }
  if (!data_emprestimo) {
    response.status(400).json({ message: "O ano de publicaçâo é obrigatório" });
  }
  if (!data_devolucao) {
    response.status(400).json({ message: "O gênero é obrigatório" });
  }
  //Cadastrar um livro -> antes preciso saber se esse livro existe
  const checkSQL = /*sql*/ `SELECT * FROM livros
  WHERE titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`;

  const insertData = [
    "cliente_id",
    "livro_id",
    "data_emprestimo",
    "data_devolucao",
    cliente_id,
    livro_id,
    data_emprestimo,
    data_devolucao,
  ];
  conn.query(checkSQL,insertData, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Erro ao buscar os livros" });
      return console.log(err);
    }

    if (data.length > 0) {
      response.status(409).json({ message: "Livro já existe" });
      return console.log(err);
    }

    const id = uuidv4();

    const insertSQL = /*sql*/ `INSERT INTO livros
    (id,titulo,autor,ano_publicacao,genero,preco)
    VALUES
    ("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}","${preco}")`;

    conn.query(insertSQL, (err) => {
      if (err) {
        response.status(500).json({ message: "Erro ao cadastrar livro" });
        return console.log(err);
      }
      response.status(201).json({ message: "Livro cadastrado" });
    });
  });
};
