const fs = require("fs")

module.exports = async bot => {

    var commands = []
    fs.readdirSync("./Commands").filter(f => f.endsWith(".js"))
    .forEach(async file => {

        let command = require(`../Commands/${file}`)

        if(!command.name || typeof command.name !== "string"){
            throw new TypeError(`command ${file.slice(0,file.length-3)} has no name`)
        }

        commands.push(command)
    })

    return commands
}