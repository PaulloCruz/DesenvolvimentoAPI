import conn from "../config/conn";

const tableOnibus = /*sql*/ ` 
    CREATE TABLE IF NOT EXISTS(
        id INT PRIMARY KEY AUTO_INCREMENTE NOT NULL,
        placa VARCHAR(50) NOT NULL,
        modelo VARCHAR(255) NOT NULL,
        ano_fabricacao DATE NOT NULL,
        capacidade INT NOT NULL,
        id_linha INT NOT NULL,
        FOREIGN KEY (id_linha) REFERENCES linhas(id),
        id_motorista INT NOT NULL,
        FOREIGN KEY (id_motorista) REFERENCES motoristas(id) 
    )
`

conn,query(tableOnibus,(err)=>{
    if(err){
        console.error("Error ao criar a tabela"+err.stak)
        return
    }
    console.log("Tabela [clientes] criada com sucesso")
})