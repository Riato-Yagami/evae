const { EmbedBuilder } = require('discord.js');

const srt = table.sort

module.exports = async ( message, assets, user, page = 0, sort, imageCount, text) => {
    imageCount = Math.min(imageCount,4)
    const subArrs = fun.subArray(assets,imageCount)
        
    var embeds = []

    for await (const subArr of subArrs) {
        embeds.push(await buildEmbed( message, user, subArr, sort,text))
    }

    fun.displayPages(message,embeds,'asset',assets.length, page);

    return
}

async function buildEmbed( message, user, assets, sort,text){
    var illustrations = []
    let embed = new EmbedBuilder()

    assets.forEach(asset => {
        if(asset.illustration) illustrations.push(asset.illustration)
    });

    var parsedResult = ``
    var red = [], green = [], blue = []

    for await (const asset of assets) {
        red.push(correctColor(asset.color[0]))
        green.push(correctColor(asset.color[1]))
        blue.push(correctColor(asset.color[2]))

        parsedResult += await fun.parseSortTitle(message,asset,sort)
        parsedResult += '\n'
    }

    const color = [Math.floor(fun.arrStats(red).mean), 
        Math.floor(fun.arrStats(green).mean), 
        Math.floor(fun.arrStats(blue).mean)]
    
    // console.log(color)
    embed
        .setColor(color)
        .setURL("https://example.org/")
    // console.log(parsedResult)
    if(text){
        embed
            .setAuthor({ name: `${user.username}'s assets`
            // , iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' 
            })
            .setDescription(parsedResult)
    }

    await fun.ownedEmbed( message, embed, user, true, assets[0],true)
    // console.log(illustrations)
    const embeds = fun.imageEmbed(embed,illustrations)
    return embeds
}

function correctColor(color){
    return Math.min(Math.abs(color | 125),255)
}