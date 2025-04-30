const parsers = require(__basedir + "/botSettings/table/tableFun").dBParser
const prx = table.prefix
module.exports = assetDb => {
    const prefix = assetDb.id[0]
    const category = Object.keys(prx).find(key => prx[key] === prefix);
    const parser = parsers[category];
    const asset = parser(assetDb)
    asset.color = fun.refactorColor(asset.color)
    return asset
}