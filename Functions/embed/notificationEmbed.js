const { EmbedBuilder } = require('discord.js');

module.exports = notif => {
    let embed = new EmbedBuilder()
        .setTitle('Notifications')
        .setDescription(`**Updates** ${notif.updateNotification == 1? emojies.yes : emojies.no}`
        + ` **Votes** ${notif.voteNotification == 1? emojies.yes : emojies.no}`
        + ` **Rolls** ${notif.rollNotification == 1? emojies.yes : emojies.no}`)
        .setColor([010,240,060])
    return embed
}