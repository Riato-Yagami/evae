const mysql = require("mysql2")

const database = require(__basedir + "/.env/database.js")

module.exports = async () => {

    let db = await mysql.createConnection({
        host: database.host,
        port: database.port,
        user: database.user,
        password: database.password,
        database: config.beta && !config.bulkQueryFilms? "wikipaeBeta" : "wikipae",
        // queueLimit : 0, // unlimited queueing
        // connectionLimit : 0 // unlimited connections 
    })

    return db
}