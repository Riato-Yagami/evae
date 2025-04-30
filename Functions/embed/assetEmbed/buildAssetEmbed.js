const prx = table.prefix
const embeds = require(__basedir + "/botSettings/table/tableFun").embed
const { EmbedBuilder } = require('discord.js');

module.exports = async (message,asset) => {
    var prefix
    if(!asset.id){
        // console.log(asset)
    }
    prefix = asset.id.charAt(0)

    const category = Object.keys(prx).find(key => prx[key] === prefix);
    const buildEmbed = embeds[category];

    var title = fun.parseTitle(asset, true, false, false)

    let embed = new EmbedBuilder()
        .setTitle(title)
        .setColor(asset.color || [0,0,0])

    if(asset.illustration != '') embed.setImage(asset.illustration)

    if(asset.link != '') embed.setURL(asset.link)
        
    await buildEmbed(message,embed,asset)

    return embed
}