const { EmbedBuilder } = require('discord.js');

module.exports = (report) => {
    let embed = new EmbedBuilder()
        .setTitle(`**${report.object}**`)
        .setDescription(report.description)
        .setColor([100,220,100])
        .setAuthor({ name: `${fun.parseUsername(report.user)} - ${report.guild.name}` 
            , iconURL : report.user.displayAvatarURL()
        })

        if(report.illustration){
            try {
                embed.setImage(report.illustration);
            } catch (error) {
                report.errors.push('Failed to load image')
                report.illustration = null
            }
        }

        if(report.command) embed.setFooter({text : `${emojies.owned} /${report.command}`})

        if(report.errors.length > 0 ){
            errorStr = ''

            report.errors.forEach(error => {
                errorStr += `- ${error} \n`
            });

            embed.setFields({ name: `Error ${emojies.error}`, value: errorStr })
            .setColor([218,55,60])
        }

    return embed
}