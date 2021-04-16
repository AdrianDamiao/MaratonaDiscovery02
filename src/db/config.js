const sqlite3 = require('sqlite3')
const { open } = require('sqlite') //Traz apenas a funcionalidade open do sqlite

module.exports = () => open({ //Tem que ser arrow function, quando existe apenas uma coisa nao precisa de chave
        filename: './database.sqlite', // o open nessa arrow fucntion nao é um objeto
        driver: sqlite3.Database
    });
