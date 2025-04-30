const { EmbedBuilder } = require('discord.js');

module.exports = (hlp) => {
    let embed = new EmbedBuilder()
        .setColor(fun.colordleColor())
        .setTitle(hlp.title)
        .setDescription(fun.parseTextCmd(hlp.dscr))

    return embed
}