module.exports = async (title, tbl, bot, option, homonym = 0) => {
    var dbQuery = `SELECT * FROM ${tbl}
    `
    // dbQuery+= `JOIN history
    // ON ${tbl}.id = history.assetID
    // JOIN asset
    // ON history.historyID = asset.historyID
    // JOIN player
    // ON history.playerID = player.playerID
    // `
    dbQuery+= `WHERE ${tbl}.title = '${fun.encode(title)}'
    `

    if(option){
        switch (tbl) {
        case 'fandom':
            break;

        case 'film':
            break;
    
        case 'game':
            break;
        
        case 'music':
            dbQuery += `AND ${tbl}.artist = '${fun.encode(option)}'`
            break;
    
        case 'poke':
            dbQuery += `AND ${tbl}.setname = '${fun.encode(option)}'  AND ${tbl}.homonym = '${homonym}'`
            break;
    
        case 'wiki':
            break;
        }
    }else if(tbl == 'poke') {
        return
    }
    
    const queryRes = await fun.queryDb(dbQuery)

    if(!queryRes) return null
    if(queryRes.length == 0) return null

    var asset
    const assetDb = queryRes[0]

    // console.log(assetDb)

    asset = fun.parseAssetDb(assetDb)

    asset.history = assetDb.historyID
    asset.user = assetDb.user
    asset.guild = assetDb.guild

    return asset
}