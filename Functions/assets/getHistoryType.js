module.exports = async ( guild, asset) => {
    
    const guildID = asset.guild || guild.id
    const assetID = asset.id

    query = `SELECT history.type FROM history
    JOIN player
    ON history.playerID = player.playerID
    JOIN asset
    On asset.historyID = history.historyID
    WHERE player.guild = '${guildID}' AND history.assetID = '${assetID}'`

    const queryRes = await fun.queryDb(query)

    if(!queryRes || queryRes.length == 0) return null

    var history = queryRes[0].type
    
    return history
}