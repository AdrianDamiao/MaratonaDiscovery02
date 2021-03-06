module.exports = {
remainingDays(job){

    //ajustes do jobs
    //calculo de tempo restante
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
    const createdDate = new Date(job.created_at)
    const dueDay = createdDate.getDate() + Number(remainingDays) //getDay dia da semana, getDate dia do mes
    const dueDateInMs = createdDate.setDate(dueDay) //seta a data do futuro com base nos dias restantes em milisegundos
    const timeDiffInMs = dueDateInMs - Date.now()
    const dayInMs = 1000*60*60*24
    const dayDiff = Math.ceil(timeDiffInMs / dayInMs ) //Arredonda p baixo
    
    return dayDiff
},

calculateBudget: (job, valueHour) => valueHour * job["total-hours"]

}