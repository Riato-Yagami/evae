const { EmbedBuilder } = require('discord.js');
const about = require(__basedir + '/ressources/text/about.js')

module.exports = (bot) => {
    let embed = new EmbedBuilder()
        .setColor(fun.colordleColor())
        .setTitle('About')
        .setDescription(about.dscr)
        .setFooter({ text: 
            `${emojies.owned} Wan't to support my work? -> /support`
    })

    about.blocks.forEach(block => {
        var text = ''
        block.links.forEach(link => {
            text += `[*${link.text}*](${link.link})\n`
        });
        embed.addFields(
            { name: block.title, value: text }
        );
    })

    return embed
}