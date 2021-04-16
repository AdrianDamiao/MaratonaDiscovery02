const { response } = require("express")
const express = require("express") //Chamando o modulo express
const server = express() // Rodando a funcoa do express
const routes = require("./routes.js")
const path = require("path")

//console.log(server)


//usando o template engine
server.set('view engine', 'ejs') //O server entende que os arquivos do ejs esta na pasta views, que deve estar fora da src. Usamos o dirname para mostrar ao serveronde a views esta(nao e mto legal)

//Mudando a localizacao da pasta views
server.set('views', path.join(__dirname, 'views'))

server.use(express.static("public")) //O use atua como midware no meu get habilitando arquivos estaticos(assets)
//O express entende que tudo que está dentro de public deve virar uma rota para a minha aplicacao

//habilitar o req.body
server.use(express.urlencoded({ extended: true })) //O front end envia pelo post todos os atributos name do body para compor o objeto

//Rotas importadas do routes.ts 
server.use(routes) //O Use mais uma vez atuando como midware habilitando as rotas




server.listen(3000, () => console.log('Servidor Iniciado...')) // Iniciar o meu server na porta 3000 e rodar uma funcao
