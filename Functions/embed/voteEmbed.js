const { EmbedBuilder } = require('discord.js');
const botId = require(__basedir + '/config').botId
const voteLink = `https://top.gg/bot/${botId}/vote`
const imageLink ='https://images-ext-1.discordapp.net/external/AV9DzyPSAu5B7XRf44LtaebB7OPcwlzC51eVC61cj40/https/cdn.top.gg/web-assets/social-preview.png?width=720&height=378'

module.exports = (hasVoted,timeInfo) => {

    let embed = new EmbedBuilder()

    if(hasVoted == null){
        embed.setTitle('Your vote cooldown has reset !')
        // embed.setFooter({text : `Disable vote notifications with /notifaction vote: false`})
    }
    else{
        embed.setTitle('Voting for Evaé')
        .setDescription(
            `Vote for Evaé and earn **bonus claims** !`+
            `\n`+
            `You can vote up to **1 time every 12 hours**`+
            `\n\n`+
            (hasVoted? `**You have voted** this past 12 hours,`
            + (timeInfo.negative?
            `\n`
            + `next vote in : `
            + `**${timeInfo.hours}:${(timeInfo.mins> 9)? '' : '0'}${timeInfo.mins}:${(timeInfo.secs> 9)? '' : '0'}${timeInfo.secs}**`
            : ``)
            : `You can [**vote now**](${voteLink})`)
        )
        embed.setFooter({text : `${emojies.owned} Get vote notifications with /notifaction vote: true`})
    }

    embed.setURL(voteLink)
    
    .setImage(imageLink)
    .setColor([200,40,82])

    return embed
}