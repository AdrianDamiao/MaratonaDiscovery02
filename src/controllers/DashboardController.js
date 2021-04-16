const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res){
    // Request e Response recebidos do express
    console.log('GET no index')

        const jobs = await Job.get();
        const profile = await Profile.get(); //pedindo os dados do model
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        //total de horas por dia de cada job em progresso
        let jobTotalHours = 0

        const updatedJobs = jobs.map((job) => {
        const remaining = JobUtils.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        
        // status = done
        //statusCount[done] += 1
        //somando a quantidade de status
        statusCount[status] += 1

        jobTotalHours = status === 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours //IF ternario

        return {
            ...job, // pega tudo em job e abrevia
            remaining, //adicionando no jobs os novos atributos automaticamente
            status,
            budget: JobUtils.calculateBudget(job, profile["value-hour"]) //Profile.get()["value-hour"] funciona
        }
        })

            //qtd trabalho - qtd jobs em progress
            const freeHours = profile["hours-per-day"] - jobTotalHours

            //1 return res.send('Resposta') // é necessario enviar uma resposta ao front-end e quebrar o loop
            //2 return res.sendFile("../index.html") respondendo um html, porem deve ser o caminho absoluto C:/User.....
            //3 return res.sendFile(basePath + "/index.html")
            return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours }) //Enviando para o ejs também os jobs    
    }
}