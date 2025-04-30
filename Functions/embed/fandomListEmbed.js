const { EmbedBuilder } = require('discord.js');

const aEmo = require(__basedir + "/botSettings/action").emoji

module.exports = ( fandoms) => {
    var str = []
    
    fandoms.forEach(fandom => {
        const enabled = fandom.wL;
        str += `${enabled? '🟩' : '🟥'}` 
        +` [${fandom.title}](${fandom.link})` 
        +` - **${fandom.tag}**` 
        +` - ${fun.parseNumber(fandom.pC)}\n`
    });

    embed = new EmbedBuilder()
        .setColor([100,220,100])
        // .setTitle(title)
        .setDescription(str)

    return embed
}