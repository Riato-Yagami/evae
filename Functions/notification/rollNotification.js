module.exports = async _ => {
    notify()
}

async function notify(){
    const queryPlayers = `SELECT user,guild
    FROM player
    WHERE rollNotification = 1
    AND rollNotified = 0`

    const players = await fun.queryDb(queryPlayers)

    // console.log(players)

    var notifiedUsers = []
    var notifiedGuilds = []

    for await (const p of players) {
        const user = await fun.getUser(p.user)
        const guild = fun.getGuild(p.guild)
        if(!user.left && !guild.left){
            fun.privateMessage(user,`${user}, your rolls have been refilled on **${guild}** !`)
            notifiedUsers.push(p.user)
            notifiedGuilds.push(p.guild)
        }
    }

    if(notifiedUsers.length == 0) return

    const queryUpdate = `UPDATE player
    SET rollNotified = true
    WHERE user IN (${notifiedUsers.map(id => `'${id}'`).join(',')})
    AND guild IN (${notifiedGuilds.map(id => `'${id}'`).join(',')})`

    fun.queryDb(queryUpdate)
}