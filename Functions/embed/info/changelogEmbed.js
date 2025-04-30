const { EmbedBuilder } = require('discord.js');
const logs = require(__basedir + '/ressources/text/changelog.js').logs

module.exports = async (message,last) => {
    
    var embeds = []

    if(last){
        return (await logEmbed(message,logs[0]))
    }

    for await (const log of logs) {
        embeds.push( await logEmbed(message,log))
    }

    return embeds
}

async function logEmbed(message,log){
    var date = new Date(log.date)

    date.setHours(1) // for Colordle

    const dateText = await fun.parseDate(message,date)

    let embed = new EmbedBuilder()
        .setColor(fun.colordleColor(date))
        .setTitle(`Evaé - version: ${log.version}`)
        .setFooter({ text: `${emojies.owned} ${dateText} ${emojies.owned}`})

    if(log.dscr) embed.setDescription(log.dscr)
    addField(embed,log.added,'Added','**+**')
    addField(embed,log.changed,'Changed','**•**')
    addField(embed,log.fixed,'Fixed','**-**')
    return embed
}

function addField(embed,field,title,bullet){
    if(field){
        var txt = '';
        field.forEach(e => {
            txt += `${bullet} ${fun.parseTextCmd(e.name)}\n`
        });

        embed.addFields({name : `${title} :`, value : txt})
    }
}