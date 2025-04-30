const { EmbedBuilder } = require('discord.js');

module.exports = {
    name : "rollinfo",
    sort : 9,
    description : "Roll and claim Info",
    ldscr : "Get information about your number of roll and claim left in this hour.",
    permission : "Aucune",
    dm: false,

    async run(message){
        // const player = await fun.playerRollAndClaim(message)
        let player = message.player

        const timeLeft = fun.getTimeUntilReset()

        const claimText = fun.countText(player.claims,player.bonusClaim)
        const rollText = fun.countText(player.rolls,player.bonusRoll)
        
        info = `**${claimText}** claim${(player.claims > 1)? 's' : ''} left`
        + `\n**${rollText}** roll${(player.rolls + player.bonusRoll > 1)? 's' : ''} left`
        + `\nnext reset in : **${timeLeft}**`

        let embed = new EmbedBuilder()
            .setColor([255,255,255])
            .setDescription(info)

        fun.reply(message,{ embeds: [embed]})
    }
}