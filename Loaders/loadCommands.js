const clc = require("cli-color");

module.exports = async _ => {
    var commands = await fun.getCommands(bot)

    commands.forEach(async command => {
        // console.log(command)
        bot.commands.set(command.name, command)
    });

    commands.sort((a, b) => b.name.length - a.name.length);

    if(config.beta) console.log(`${clc.red(commands.length)} ${clc.yellow("commands")} loaded`)
}