const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    create(req, res){
       return res.render("job")
    },

    async save(req, res){
        // Reference: { name: '22312', 'daily-hours': '321', 'total-hours': '23' }
        //essa logica o banco de dados ja az
        //const jobs = await Job.get();
        //const lastId = jobs[jobs.length - 1]?.id || 0; //Só procura se existir(?) ou pega id 1 Para saber qual o id do ultimo
        
        console.log(req.body["daily-hours"], req.body["total-hours"])

        await Job.create({
            name: req.body.name,
            "daily-hours": req.body["daily-hours"],
            "total-hours": req.body["total-hours"],
            created_at: Date.now(),
        })

        return res.redirect('/')
    },
    
    async show(req, res){
    const jobs = await Job.get();
    const profile = await Profile.get()
    const jobId = req.params.id
    
    const job = jobs.find(job => Number(job.id) === Number(jobId))//Se o find achar um retorno verdadeiro ele pega o objeto passado por parametro e coloca onde eu pedi. Ele passa em cada job(foreach)
    
    if(!job){
        return res.send('Job not found')
    }

    job.budget = JobUtils.calculateBudget(job, profile["value-hour"])

    return res.render("job-edit", { job })
    },

    async update(req, res){

    const jobId = req.params.id
    
    const updatedJob = {
        name: req.body.name,
        "total-hours": req.body["total-hours"], //Fazer a verificacao futura de preenchimento
        "daily-hours": req.body["daily-hours"],
    }
    //verifica qual job id eu estou procurando e altera ele
        await Job.update(updatedJob, jobId)
        
        res.redirect('/job/'+ jobId)
    },

    async delete(req, res){
        const jobId = req.params.id

        await Job.delete(jobId)
        //sem bd const deleteJob = jobs.filter(job => Number(job.id) !== Number(jobId)) //Continua a ser executado verificando cada elemento e enquanto for verdadeiro(igual) o que for false sai do filtro nao preciso mais o model mesmo faz

        return res.redirect('/')
    }
}