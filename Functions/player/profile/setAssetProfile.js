module.exports = async (player,asset) => {
    var assetID = false
    if(asset) assetID = asset.id
    const dbInsertAsset = `UPDATE player
            SET profileAsset = ${assetID? `'${assetID}'` : 'NULL'}
            WHERE playerID = ${player.playerID}`
    
    await fun.queryDb(dbInsertAsset)

    return
}