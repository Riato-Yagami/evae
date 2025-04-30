const { userMention } = require("discord.js")

module.exports = {
    name : "notification",
    sort : 9,
    description : "Set profile notifications settings",
    ldscr : "Change your profile notifications settings",
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "Boolean",
            name: "update",
            description: `true -> enable, false -> disable`,
            ldscr: `Get a private message containing the changelog of new updates right as they are uploaded`
            +` (**false** by default)`,
            required: false
        },
        {
            type: "Boolean",
            name: "vote",
            description: `true -> enable, false -> disable`,
            ldscr: `Get a private message containing the changelog of new updates right as they are uploaded`
            +` (**false** by default)`,
            required: false
        },
        {
            type: "Boolean",
            name: "roll",
            description: `true -> enable, false -> disable`,
            ldscr: `Get a private message containing the changelog of new updates right as they are uploaded`
            +` (**false** by default)`,
            required: false
        },
    ],

    async run(message,args){
        
        const update = args.getBoolean("update")
        const vote = args.getBoolean("vote")
        const roll = args.getBoolean("roll")

        const guildID = message.guild.id
        const userID = message.user.id
        var queryUpdateUser = `UPDATE user
        SET `

        if(update != null){
            queryUpdateUser += `updateNotification = ${update}`
        }

        if(vote != null){
            if(update != null){
                queryUpdateUser += `, `
            }
            queryUpdateUser += `voteNotification = ${vote}`
        }

        if(update != null || vote != null){
            queryUpdateUser += `
            WHERE user = '${userID}'`
            await fun.queryDb(queryUpdateUser)
        }

        if(roll != null){
            var queryUpdatePlayer = `UPDATE player
            SET rollNotification = ${roll}
            WHERE user = '${userID}'
            AND guild = '${guildID}'`

            await fun.queryDb(queryUpdatePlayer)
        }

        const queryNotification = `SELECT updateNotification, rollNotification, voteNotification
        FROM user JOIN player
        ON player.user = user.user
        WHERE player.user = '${userID}'
        AND player.guild = '${guildID}'
        `

        const queryRes = await fun.queryDb(queryNotification)

        const embed = fun.notificationEmbed(queryRes[0])

        fun.reply(message,{embeds : [embed]})
    }
}