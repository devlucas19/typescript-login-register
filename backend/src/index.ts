import express from "express"
import cors from "cors"
import "dotenv/config"

import { errorHandler } from "./middlewares/errorHandler"
import router from "./routes/routes"
import { pool } from "./database/database"


const app = express()


// Função de criação da tabela a qual deve ser executada no inicio do projeto.
async function createTable(){
    const tableQuery = 
        `CREATE TABLE IF NOT EXISTS users(
            id CHAR(36) PRIMARY KEY,
            fullName VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,  
            password VARCHAR(255) NOT NULL,  
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  
        )`

    try {
        const tableCreator = await pool.query(tableQuery)
        console.log("Tabela criada com sucesso")
    } catch (error) {
        console.error(error)
    }
}
// createTable()

// Teste de conexão do banco de dados.
async function connectionTest(){
    try {
        const connection = await pool.getConnection()
        console.log("Conectado ao MySQL")
        connection.release()
    } catch (error) {
        console.error(error)
    }
}

app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandler)


app.listen(process.env.PORT, ()=> {
    connectionTest()
    console.log("Server's running")
})

