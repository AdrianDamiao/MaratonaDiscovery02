const Database = require('../db/config')

/*let data = {
        name: "Adrian",
        avatar: "https://www.github.com/AdrianDamiao.png",
        "monthly-budget": 4000, //Eu preciso colocar entre aspas por causa do hifen
        "days-per-week": 6,
        "hours-per-day": 8,
        "vacation-per-year": 4,
        "value-hour": 75
}*/

module.exports = {
    async get(){

        const db = await Database()
        
        const data = await db.get(`SELECT 
        name,
        avatar,
        monthly_budget,
        days_per_week,
        hours_per_day,
        vacation_per_year,
        value_hour
        FROM profile;`)

        console.log(data)

        await db.close()
        
        

        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "value-hour": data.value_hour,
        }; //Normalizacao
    },
    async update(newData){

        const db = await Database()

        db.run(`UPDATE profile SET 
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData["monthly-budget"]},
        days_per_week = ${newData["days-per-week"]},
        hours_per_day = ${newData["hours-per-day"]},
        vacation_per_year = ${newData["vacation-per-year"]},
        value_hour = ${newData["value-hour"]};
        `)
        
        await db.close()
    }
}