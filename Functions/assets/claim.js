module.exports = async (message,user,asset,type = "claim") => {

    // console.log(asset)
    if(type == "claim"){
        const owner = await fun.owner(asset,message,bot)
        // console.log(owner)
        // console.log(message.guild.id)

        if(
            owner && (
            (message.guild.id == "web" && owner.includes(message.user.id))
            || (message.guild.id != "web")
            )
        ){
            return false
        }
    }
    
    const guildID = message.guild.id
    const userID = user.id;
    const assetID = asset.id;

    const dbInsertHistory = `
    INSERT INTO history (type, assetID, playerID)
    SELECT '${type}', '${assetID}', playerID
    FROM player
    WHERE guild = '${guildID}' AND user = '${userID}'
    `

    const dbGetLastID = 'SELECT MAX(historyID) from history'

    await fun.queryDb(dbInsertHistory)
    const queryRes = await fun.queryDb(dbGetLastID)
    const newID = Object.values(queryRes[0])[0]
    // const newID = Object.values(Object.values(queryRes)[0])[0]
    const dbInsertAsset =  `INSERT INTO asset (historyID) VALUES ('${newID}')`
    fun.queryDb(dbInsertAsset)
    return true
}