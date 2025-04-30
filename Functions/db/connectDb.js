const loadDatabase = require(__basedir + "/Loaders/loadDatabase")
const config = require(__basedir + "/config")

const clc = require("cli-color");

module.exports = async _ => {
    bot.db = await loadDatabase()
    bot.db.connect(function(error) {
        if(error){console.log(error)}
        else if(config.beta){
            console.log(`${clc.yellow("dataBase")} loaded`)
        }else{
            console.log(`dataBase loaded`)
        }
    })
}