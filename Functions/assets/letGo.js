module.exports = async (message,user,asset,trade,type = "letgo") => {
    const assetID = asset.id

    const playerID = (await fun.getPlayer(message.guild,user)).playerID

    // console.log(playerID)

    const dbInsertHistory = `
    INSERT INTO history (type, assetID, playerID)
    SELECT '${type}', '${assetID}', '${playerID}'
    `

    const dbDeleteAsset = `DELETE asset FROM asset
    INNER JOIN history
    ON asset.historyID = history.historyID
    WHERE history.playerID = "${playerID}" AND history.assetID = "${assetID}"`

    // console.log(dbQuery)

    if(!trade) fun.queryDb(dbInsertHistory)
    fun.queryDb(dbDeleteAsset)
    
}