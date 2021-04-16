const Database = require('./config')
//Beekeeper sugestao de SQL editor
const initDb = {
    async init(){ //Podia ser arrow mas é melhor assim, pois essa estrutura me permite colocar os awaits no async

    const db = await Database() //Porque o JS nao espera a o banco de dados terminar e da ruim

        await db.exec(`CREATE TABLE profile(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            monthly_budget INT,
            days_per_week INT,
            hours_per_day INT,
            vacation_per_year INT,
            value_hour INT
        )`); //Codigos de banco de dados ficam entra crase

        //Os outros nao possuem const pois eu nao preciso do resultado do anterior para executa-los
        await db.exec(`CREATE TABLE jobs(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            daily_hours INT,
            total_hours INT,
            created_at DATETIME
        )`);

        await db.run(`INSERT INTO profile(
            name, 
            avatar, 
            monthly_budget, 
            days_per_week, 
            hours_per_day,
            vacation_per_year,
            value_hour
            ) VALUES (
                "Adrian",
                "https://www.github.com/AdrianDamiao.png",
                3000,
                5,
                5,
                4,
                75
            );`)

        await db.run(`INSERT INTO jobs(
            name,
            daily_hours,
            total_hours,
            created_at
            ) VALUES (
            "Proj Teste",
            5,
            50,
            1617514376018

        );`);

        await db.close()

    }
}

initDb.init()