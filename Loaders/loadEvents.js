const fs = require("fs")
const clc = require("cli-color");

module.exports = async _ => {
    let count = 0
    fs.readdirSync("./Events").filter(f => f.endsWith(".js"))
    .forEach(async file => {
        let event = require(`../Events/${file}`)
        bot.on(file.split(".js").join(""), event.bind(null,bot))
        count++
    })

    if(config.beta) console.log(`${clc.red(count)} ${clc.yellow("events")} loaded`)
} 