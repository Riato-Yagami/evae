const { EmbedBuilder } = require('discord.js');
const emo = table.emoji

module.exports = async (message, prfl) => {
    const dColor = await fun.getDominantColor(prfl.picture)
    var countText = ``

    prfl.assetCount.forEach(cnt => {
        countText += `**${fun.parseNumber(cnt.count)}** ${emo[cnt.table]}  `
    });

    var power = 0
    var powerUp = 0

    prfl.power.forEach(pwr => {
        power += pwr.power
        powerUp += pwr.powerUp
    });
    
    var author

    if(prfl.global && prfl.server){
        author = `${bot.user.username} stats`
    }else{
        author = `${prfl.name}${prfl.global? ' global' : `'`} profile`
    }

    countText += `\n**${fun.parsePower({power : power, powerUp : powerUp})}**`

    if(prfl.powerBank) countText += `\n**${emojies.bank} ${fun.parseNumber(prfl.powerBank)} ${emojies.power}**`

    if(prfl.serverCount || prfl.playerCount) countText += `\n`

    if(prfl.serverCount){
        countText += `${emojies.server} **${fun.parseNumber(prfl.serverCount)}** `
    }

    if(prfl.playerCount){
        countText += `${emojies.user} **${fun.parseNumber(prfl.playerCount)}**`
    }

    embed = new EmbedBuilder()
        .setColor(dColor)
        .setTitle(author)
        .setFooter({ text: await fun.parseDate( message, prfl.date)})
        .setDescription(countText)
        .setThumbnail(prfl.picture)

    if(prfl.asset && prfl.asset.illustration){
        embed
        .setImage(prfl.asset.illustration)
        
    }

    return embed
}