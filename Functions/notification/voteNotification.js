module.exports = async _ => {
    const embed = fun.voteEmbed()
    const data = {embeds : [embed]}
    notify(data)
}

async function notify(data){
    const queryUsers = `SELECT user
    FROM user
    WHERE voteNotification = 1
    AND voteNotified = 0`

    const users = await fun.queryDb(queryUsers)

    // console.log(users)
    var notifiedUsers = []

    for await (const u of users) {
        const user = await fun.getUser(u.user)

        if(!user.left){
            const hasVoted = await fun.hasVoted(user.id)

            if(!hasVoted
                // || true
                ){
                fun.privateMessage(user,data)
                notifiedUsers.push(user.id)
            }
        }
    }

    if(notifiedUsers.length == 0) return

    const queryUpdate = `UPDATE user
    SET voteNotified = true
    WHERE user IN (${notifiedUsers.map(id => `'${id}'`).join(',')})`

    fun.queryDb(queryUpdate)
}