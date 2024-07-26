// id,nome, email, senha, imagem(imagem do google)
// criar, listar, atualizar, listar por id
import conn from "../config/conn.js";

const talbeEmprestimos = /*sql*/ `
    CREATE TABLE IF NOT EXISTS esmprestimos(
        id INT PRIMARY KEY AUTO_INCREMENT,
        cliente_id VARCHAR(60) NOT NULL,
        livro_id VARCHAR(60) NOT NULL,
        foreign key (cliente_id) REFERENCES clientes(id),
        foreign key (livro_id) REFERENCES livros(id), 
        data_emprestimo DATE NOT NULL,
        data_devolucao DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
`;

conn.query(talbeEmprestimos, (err, result, field) => {
  if (err) {
    console.error("Error ao criar a tabela" + err.stack);
    return;
  }
  //   console.log(result);
  // console.log(field);
  console.log("Tabela [emprestimos] criada com sucesso");
});
