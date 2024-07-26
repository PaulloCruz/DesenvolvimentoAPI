import conn from "../config/conn.js";

const tableOnibus = /*sql*/ ` 
    CREATE TABLE IF NOT EXISTS onibus(
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        placa VARCHAR(250) NOT NULL,
        modelo VARCHAR(255) NOT NULL,
        ano_fabricacao YEAR(4) NOT NULL,
        capacidade INT NOT NULL,
        id_linha INT NOT NULL,
        id_motorista INT NOT NULL,
        FOREIGN KEY (id_linha) REFERENCES linhas(id),
        FOREIGN KEY (id_motorista) REFERENCES motoristas(id) 
    )
`

conn.query(tableOnibus,(err)=>{
    if(err){
        console.error("Error ao criar a tabela"+err.stack)
        return
    }
    console.log("Tabela [onibus] criada com sucesso")
})