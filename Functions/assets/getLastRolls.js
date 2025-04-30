module.exports = async (playerID, count = 1) => {
    let query = `SELECT assetID
    FROM history
    WHERE playerID = ${playerID}
    AND type = "roll"
    ORDER BY historyID DESC
    LIMIT ${count}`

    let data = await fun.queryDb(query)
    if(!data) return

    var assets = []
    data.forEach(asset => {
        assets.push(asset.assetID)
    });

    return assets
}