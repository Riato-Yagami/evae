module.exports = (replyEmbed, message, reply) => {

    try {const footer = replyEmbed.data.footer.text
        replyEmbed.setFooter({ text: `${emojies.no}${footer.substring(2,footer.length-2)}🕐 time is up !`})
    } catch (error) {
        replyEmbed.setFooter({ text: `${emojies.timesUp} time is up !`})
    }
    
    fun.reply(message,{ embeds: [replyEmbed], fetchReply: false})
    reply.reactions.removeAll()
}