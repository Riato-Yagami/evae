const { EmbedBuilder } = require('discord.js');

const srt = table.sort

const assetPerPage = 20

module.exports = async (assets, message, bot, user, page = 0, sort) => {

    const subArrs = fun.subArray(assets,assetPerPage)
        
    var embeds = []

    for await (const subArr of subArrs) {
        embeds.push(await buildEmbed( message, user, subArr, sort))
    }

    fun.displayPages(message,embeds,'asset',assets.length, page);

    return
}

async function buildEmbed( message, user, assets, sort){
    var parsedResult = ''

    for await (const asset of assets) {
        parsedResult += await fun.parseSortTitle(message,asset,sort)
        parsedResult += '\n'
    }

    const dColor = await fun.getDominantColor(user.displayAvatarURL())

    let embed = new EmbedBuilder()
        .setColor(dColor)
        .setTitle(`${user.username}'s assets`)
        .setDescription(`${parsedResult}`)
    
    await fun.ownedEmbed( message, embed, user, true, assets[0],true)
    return embed
}