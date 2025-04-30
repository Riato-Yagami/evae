module.exports = async (userID,guildID) => {
    const query = `SELECT assetID FROM history
    JOIN asset
    ON history.historyID = asset.historyID
    JOIN player
    ON history.playerID = player.playerID
    WHERE player.user = '${userID}'
    AND player.guild = '${guildID}'
    AND assetID LIKE 'f%'`

    const queryRes = await fun.queryDb(query)

    return queryRes
}