const Profile = require('../model/Profile'); // nao preciso por o .js porque o node ja trabalha com arquivos js

module.exports = {
    async index(req, res){
        return res.render("profile", { profile: await Profile.get() }) // Profile.get traz os dados de profile
    },

    async update(req, res){
        //req.body para pegar ops dados
        const data = req.body
        // definir quantas semanas tem no ano: 52
        const weeksPerYear = 52 
        // descontar as ferias para pegar quantas semanas tem um mes
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        // quantas horas por semana estou trabalhando
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        // total de horas trabalhadas no mes

        //horas trabalhadas no mes
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        // qual sera o valor da minha hora
        const valueHour = data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()
        await Profile.update({
            ...profile, //Spread
            ...req.body,
            "value-hour": valueHour
        }) //Não faz sentido usar profile.get() 

        return res.redirect('/profile')
    }
}