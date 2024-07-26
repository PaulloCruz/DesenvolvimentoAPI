import { CONNREFUSED } from "dns";
import conn from "../config/conn.js";

const tableMotoristas = /*sql*/ `
    CREATE TABLE IF NOT EXISTS motoristas(
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        nome VARCHAR(150),
        data_nascimento DATE NOT NULL,
        numero_carteira_habilitacao VARCHAR(255) NOT NULL
    )
`
conn.query(tableMotoristas,(err)=>{
    if(err){
        console.error("Error ao criar a tabela"+err.stack);
        return
    }
    console.log("Tabela [motoristas] criada com sucesso")
})