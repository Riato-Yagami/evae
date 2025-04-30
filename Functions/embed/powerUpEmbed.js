const { EmbedBuilder } = require('discord.js');

module.exports = (asset,power) => {

    var title = fun.parseTitle(asset, true, false, false)

    let embed = new EmbedBuilder()
        .setTitle(`${title} ⤴️${emojies.power}`)
        .setDescription(
            `**${fun.parseNumber(asset.power)} ${emojies.power}`
            + `\n+ ${fun.parseNumber(asset.powerUp)} ➡️ + ${fun.parseNumber(asset.powerUp + power)}**`)
        .setColor(asset.color)

    if(asset.illustration != '') embed.setThumbnail(asset.illustration)

    return embed
}