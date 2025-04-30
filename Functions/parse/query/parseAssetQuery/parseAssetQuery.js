const prx = table.prefix
const parser = require(__basedir + "/botSettings/table/tableFun").queryParser

module.exports = async (assetQuery,prefix) => {
    const category = Object.keys(prx).find(key => prx[key] === prefix);
    asset = await parser[category](assetQuery)
    asset.color = fun.refactorColor(asset.color)

    return asset
}