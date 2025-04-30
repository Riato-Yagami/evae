const { EmbedBuilder } = require('discord.js');

module.exports = (commands,short) => {
    helpStr = ''

    helpEmbeds = []

    commands.forEach(command => {
        // helpStr += buildCommandStr(command)
        helpEmbeds.push(buildCommandEmbed(command,short))
    });

    // embed = new EmbedBuilder()
    //     .setColor([200,154,169])
    //     // .setTitle(title)
    //     .setDescription(helpStr)

    return helpEmbeds
}

function buildCommandEmbed(command,short) {
    const title = fun.parseCmdName(command)
    var embed = new EmbedBuilder()
        .setColor(randomColor(130, 245))
        .setTitle(title)

    if(short) return embed 

    embed.setDescription(buildCommandStr(command))

    if(command.example){
        embed.setFooter({text: `ex: ${command.example}`})
    }

    return embed 
}

function buildCommandStr(command){
    str = ''
    // str += `**/${command.name}**`

    if(command.permission == 0){
        str += '*admin command*'
        str += '\n\n'
    }

    // console.log(command.ldscr)
    str += `${command.ldscr || command.description}\n`

    if(command.options){
        str+='\n'
        command.options.forEach(option => {
            str += `${buildOptionStr(option)}\n`
        });
    }

    str+= '\n'

    return str
};

function buildOptionStr(option){
    str = ''
    str += `***-${option.name}***\n`
    str += `${option.ldscr || option.description}\n`

    return str
}

function randomColor( min, max){
    const r = fun.randomInt(min,max)
    const g = fun.randomInt(min,max)
    const b = fun.randomInt(min,max)
    return [r,g,b]
}