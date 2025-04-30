const { EmbedBuilder } = require('discord.js');
const support = require(__basedir + '/ressources/text/support.js')

module.exports = (bot) => {
    let embed = new EmbedBuilder()
        .setColor(fun.colordleColor())
        .setTitle('Support')
        .setDescription(fun.parseTextCmd(support.dscr))
        .setFooter({ text: 
            support.footer
        })

    return embed
}