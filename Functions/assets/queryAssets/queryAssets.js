const prx = table.prefix
const tbls = table.table
module.exports = async ( prefixs, query, count, power) => {
    var assets = []
    if(prefixs == null || prefixs.includes(prx.fandom)) assets = await select( assets, tbls.fandom, query, count, power)
    if(prefixs == null || prefixs.includes(prx.film)) assets = await select( assets, tbls.film, query, count, power)
    if(prefixs == null || prefixs.includes(prx.game)) assets = await select( assets, tbls.game, query, count, power)
    if(prefixs == null || prefixs.includes(prx.music)) assets = await select( assets, tbls.music, query, count, power)
    if(prefixs == null || prefixs.includes(prx.wiki)) assets = await select( assets, tbls.wiki, query, count, power)
    if(prefixs == null || prefixs.includes(prx.poke)) assets = await select( assets, tbls.poke, query, count, power)
    return assets
}

async function select( assets, tbl, query, count, power){
    var dbQuery
    if(power){
        dbQuery = `SELECT SUM(power),SUM(powerUp)`
    }else if(count){
        dbQuery = `SELECT COUNT(*)`
    }else{
        dbQuery = `SELECT *, player.guild AS pGuild`
    }
    dbQuery += ` FROM ${tbl}
        JOIN history
        ON ${tbl}.id = history.assetID
        JOIN asset
        ON history.historyID = asset.historyID
        JOIN player
        ON history.playerID = player.playerID
        LEFT JOIN powerUp
        ON (${tbl}.id = powerUp.asset AND player.guild = powerUp.guild)
        ${query}
        `

        const queryRes = await fun.queryDb(dbQuery)
        if(!queryRes) return assets
        if(queryRes.length == 0) return assets

        if(power){
            const power = Object.values(queryRes[0])[0] || 0
            const powerUp = Object.values(queryRes[0])[1] || 0
            assets.push({table : tbl, power : Number(power), powerUp : Number(powerUp)})
        }else if(count){
            const cnt = Object.values(queryRes[0])[0]
            assets.push({table : tbl, count : Number(cnt)})
        }else{
            queryRes.forEach(element => {
                // console.log(element)
                parsedElement = fun.parseAssetDb(element)
                // console.log(element.historyID)
                parsedElement.history = element.historyID
                parsedElement.user = element.user
                parsedElement.guild = element.pGuild
                parsedElement.powerUp = element.powerUp || 0
                assets.push(parsedElement)
            })
        }

        return assets
}