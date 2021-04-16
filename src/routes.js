const express = require('express');
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

///const basePath = __dirname + "/views" // Depois de incluir o EJS eu nao preciso mais disso
///const views = __dirname + "/views/" nao precisa mais

routes.get('/', DashboardController.index)//Passando o index como referencia //Toda vez que um get for feito ou seja, a pagina ser acessada imprime no console isso

//Essas rotas não são feitas automaticamente como na pasta public.
//routes.get('/job', (req, res) => res.sendFile(basePath + "/job.html")) //console.log('Redirecionando para Job Add')
//routes.get('/job/edit', (req, res) => res.sendFile(basePath + "/job-edit.html")) //console.log('Redirecionando para Job Edit')
//routes.get('/profile', (req, res) => res.sendFile(basePath + "/profile.html")) //console.log('Redirecionando para Profile')
//Com a inclusao do ejs eu vou ter que renderizar os arquivos html

routes.get('/job', JobController.create) //O EJS ja le por padrao a pasta views
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
//routes.get('/job/edit', (req, res) => res.render(views + "job-edit")) Como era ante da refatoracao
routes.get('/profile', ProfileController.index) //Esse profile vai para o html {profile:profile}
routes.post('/profile', ProfileController.update)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
module.exports = routes; //O node exporta o meu routes e assim eu posso usa-lo no meu arquivo do server.js