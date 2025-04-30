const { EmbedBuilder } = require('discord.js');

module.exports = (owner,asset) => {

    const title = fun.parseTitle(asset, true, false, false)
    const minPower = fun.getScaledPower(asset)

    const description = `What asset do you want to use for attacking?`
    + `\n**INPUT** your asset name preceded by the needed tag (or emoji)`
    
    let embed = new EmbedBuilder()
        .setTitle(`Attack **${owner.username}**' ${title} min ${fun.parsePower({power: minPower})}`)
        .setDescription(description)
        .setColor([220,100,100])

    return embed
}