import conn from "../config/conn.js";

const tableLinhas = /*sql*/ `
    CREATE TABLE IF NOT EXISTS linhas(
        id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
        nome_linha VARCHAR(255) NOT NULL,
        numero_linha INT NOT NULL,
        itinerario VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(tableLinhas,(err)=>{
    if(err){
        console.error("Erro ao criar a tabela",err.stack)
        return
    }
    console.log("Tabela [linhas] criada com sucesso")
})