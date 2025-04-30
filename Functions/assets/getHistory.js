module.exports = async ( guild, asset) => {
    const guildID = guild.id
    const assetID = asset.id

    query = `SELECT history.type,player.user,history.date FROM history
    JOIN player
    ON history.playerID = player.playerID
    WHERE player.guild = '${guildID}' AND history.assetID = '${assetID}'`

    // console.log(query)

    var history = await fun.queryDb(query)

    if(!history) return null

    // console.log(history)

    for await (const element of history) {
        element.user = await fun.getUser(element.user)
    }
    
    return history
}