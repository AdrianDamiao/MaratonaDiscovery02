const Database = require('../db/config')

/*let data = [ //let jobs = [] // Controle dos jobs adicionados dinamicamente, uma estrutura de dados
    {
        id: 1,
        name: "Pizzaria Guloso",
        "daily-hours": 2,
        "total-hours": 60,
        created_at: Date.now(),
    },
    {
        id: 2, 
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        created_at: Date.now(),
    },
]*/

module.exports = {
    async get(){

        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs ORDER BY id`);

        await db.close();
        
        return jobs.map((job) =>({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at,
            }));
            //esse return vai pro map, e ele nao esta escrito porque eu estou retornando APENAS o obj por causa do arrow function
    },
    async update(updatedJob, jobId){
        const db = await Database();
        //sem bddata = newJob
        
        console.log("Update:" + updatedJob + jobId);

        db.run(`UPDATE jobs SET
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob["daily-hours"]},
        total_hours = ${updatedJob["total-hours"]}
        WHERE id = ${Number(jobId)};
       `)


        await db.close()
    },
    async delete(id){
        const db = await Database();

        db.run(`DELETE FROM jobs WHERE id = ${id}`)
        //data = data.filter(job => Number(job.id) !== Number(id)) //Continua a ser executado verificando cada elemento e enquanto for verdadeiro(igual) o que for false sai do filtro nao preciso mais o model mesmo faz
        await db.close()
    },
    async create(newJob){
        const db = await Database()

        db.run(`INSERT INTO jobs(
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "${newJob.name}",
                ${newJob["daily-hours"]},
                ${newJob["total-hours"]},
                ${newJob["created_at"]}
            )
        `)

        await db.close()

    }
}