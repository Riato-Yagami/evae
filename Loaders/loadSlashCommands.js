const Discord = require("discord.js")
const { Routes } = require("discord.js")
const clc = require("cli-color");

module.exports = async _ => {
    let commands = [];

    bot.commands.forEach(async command => {
        let slashcommand = new Discord.SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .setDMPermission(command.dm)
        .setDefaultMemberPermissions(command.permission === "Aucune" ? null : command.permission)

        if(command.options?.length >= 1) {
            for (let i = 0; i < command.options.length; i++) {
                let cmd = command.options[i];
                slashcommand[`add${
                    cmd.type.slice(0,1).toUpperCase()
                    + cmd.type.slice(1,cmd.type.length)
                    }Option`](option => option
                        .setName(cmd.name)
                        .setDescription(cmd.description)
                        .setRequired(cmd.required))
                
            }
        }

        await commands.push(slashcommand)
    })

    const rest = new Discord.REST({version: "10"}).setToken(bot.token)

    await rest.put(Routes.applicationCommands(bot.user.id), {body: commands})
    if(config.beta) console.log(`${clc.yellow("slash commands")} loaded`)
}