module.exports = async (asset, message) => {

    const guild = message.guild.id

    let owner
    // console.log(asset)
    if(asset.user){
        owner = await fun.getUser(asset.user)
        // console.log(owner)
        if(asset.guild != message.guild.id){
            // console.log(asset.guild + ' ' + message.guild.id)
            owner.externalGuild = true
        }else{
            owner.externalGuild = false
        }
        return owner;
    }

    const assetID = asset.id
    
    query = `SELECT user FROM player
    JOIN history
    ON history.playerID = player.playerID
    JOIN asset
    ON history.historyID = asset.historyID
    WHERE player.guild = '${guild}' AND history.assetID = '${assetID}'`

    const queryRes = await fun.queryDb(query)

    var owners = []

    queryRes.forEach(owner => {
        owners.push(owner.user)
    });

    if(owners.length == 0) return false

    if(message.guild.id == 'web') return owners
    return await fun.getUser(owners[0])
}