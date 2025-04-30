const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = ( message, rollInfo) => {
    const rollText = fun.rollText(rollInfo)

    const claimId = fun.createId("claim");
    var button = new ButtonBuilder()
        .setLabel(rollText)
        .setCustomId(claimId)
        .setStyle(ButtonStyle.Primary)
        .setDisabled()

    message.rollLeft = button

    var action = new ActionRowBuilder()
    fun.restoreButtons(message,action)

    fun.reply(message,{components: [action]})
}