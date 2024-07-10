const { response } = require('express')
const express = require ('express')
//import express from "express"

const PORT = 3333

const app = express()

//*Aceitar JSON
app.use(express.json())

//Rotas
/**Request HTTP
 * Query params - ...:333/pessoas?nome="Carlos"&Idade=32
 *  Rotas do tipo GET (filtros e buscas)
 * Route params - ...:333/pessoas/5
 *  Rotas do tipo GET,PUT, PATCH, DELETE,(listar um elemento)
 * Body params  - ...:333/pessoas
 *  Rotas do tipo POST (cadastro de informações)
 */

//Rota get
app.get('/users',(request,response)=>{
    const query = request.query
    // console.log(query)
    const {nome,idade} = request.query
    console.log(nome,idade)

    response.status(200).json([
        'Pessoa 1',
        'Pessoa 2',
        'Pessoa 3'

    ])
})

app.post("/users",(request,response)=>{
    const body = request.body
    // console.log(body)
    const {nome,idade} = request.body
    console.log(nome,idade)
    response.status(200).json([

        'Pessoa 1',
        'Pessoa 2',
        'Pessoa 3',
        'Pessoa 4'
    ])
})

app.put("/users/:id/:cpf",(request,response)=>{
    // const params = request.params 
    // console.log(params)
    const {id,cpf} = request.params
    console.log(id,cpf)

    response.status(200).json([
        'Pessoa 1',
        'Pessoa 10',
        'Pessoa 3',
        'Pessoa 4'
    ])
})

app.delete("/users",(request,response)=>{
    response.status(204).json([
        'Pessoa 1',
        'Pessoa 10',
        'Pessoa 3',
        'Pessoa 4'
    ])
})


app.listen(PORT,()=>{
    console.log("Servidor on port"+PORT)
})  