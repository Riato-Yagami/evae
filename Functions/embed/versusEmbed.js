const { EmbedBuilder } = require('discord.js');
const dscr = require(__basedir + "/botSettings/description")

module.exports = (trader,trady,gift,trading) => {

    const description = `${trady}, ${trader} wants to ${gift? 'give to' : (trading? 'trade' : 'challenge you')}`
    +`\n **INPUT** names of assets along with their tags that you want to engage`
    +`\n (${dscr.separator})`
    
    let embed = new EmbedBuilder()
        .setTitle(`**${trader.username}**' Wants to trade`)
        .setDescription(description)
        .setColor([100,100,100])

    return embed
}