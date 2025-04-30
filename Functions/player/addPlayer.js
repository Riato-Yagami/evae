module.exports = async (guild,user) => {
    
    fun.addUser(user)

    const guildID = guild.id // Server ID
    const userID = user.id

    const dbGetPlayer = `SELECT playerID FROM player
    WHERE user = '${userID}' AND guild = '${guildID}'`

    const queryRes = await fun.queryDb(dbGetPlayer)
    if(!queryRes) return null


    if(queryRes.length > 0){
        return 'player already added'
    }

    const dbInsertPlayer = `INSERT INTO player (user, guild) 
            VALUES ('${user.id}', '${guild.id}')`;
    
    
    // console.log(guild)
    await fun.queryDb(dbInsertPlayer)

    const message = `New player : ${user.username}#${user.discriminator} on ${guild.name}`
    console.log(message)
    fun.playerCount()
    
    return message
}