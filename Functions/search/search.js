const tblFun = require(__basedir + "/botSettings/table/tableFun")
const prx = table.prefix
const spe = table.special

module.exports = async ( message, searchString) => {
    
    var prefix
    var search

    [search,prefix] = fun.getPrefix(searchString)
    
    var option
    var homonym

    if(search.includes(spe.option)){
        searchSplit = search.split(spe.option)
        option = searchSplit[1]
        option = option.substring(0,option.length).trim().toLowerCase()
        search = searchSplit[0].trim()

        if(searchSplit.length > 2) homonym = Number(searchSplit[2])

        // console.log(`search : ${search} ; option : ${option}`)
    }
    
    const category = Object.keys(prx).find(key => prx[key] === prefix);
    const tbl = table.table[category];

    var asset
    
    var assetDb = await fun.getFromDb(search, tbl, bot, option, homonym)
    // console.log(assetDb)
    if(assetDb){
        // console.log("asset in Db")
        asset = assetDb
    }
    else{
        const searchFun = tblFun.search[category];
        assetQuery = await searchFun(search, option, message)
        if(assetQuery){
            const parser = tblFun.queryParser[category]

            if(Array.isArray(assetQuery)){
                asset = assetQuery
            }else{
                asset = await parser(assetQuery)
                fun.addToDb(asset)
            }
            
        }
    }

    if(!Array.isArray(asset) && asset){
        asset.powerUp = await fun.getPowerUp(message.guild.id,asset.id)
    }

    if(!asset || asset.length == 0){
        return tbl
    }

    return asset
}