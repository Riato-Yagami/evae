const { EmbedBuilder } = require('discord.js');

const aEmo = require(__basedir + "/botSettings/action").emoji


module.exports = async ( message, history, asset) => {
    
    var title = fun.parseTitle(asset, true, false, false)
    var historyStr = ''

    for await  (const element of history) {
        historyStr += `${await buildString(message,element)}\n`
    }

    embed = new EmbedBuilder()
        .setColor(asset.color || [000,000,000])
        .setTitle(title)
        .setDescription(historyStr)

    if(asset.link != '') embed.setURL(asset.link)

    if(asset.illustration != '') embed.setThumbnail(asset.illustration)

    return embed
}

async function buildString(message,element) {
    var emoji = aEmo[element.type]
    str = `${emoji} - **${element.user? element.user.username : 'unknown'}** - ${await fun.parseDate( message, element.date, true)}`
    return str
}