const prfx = table.prefix

module.exports = async (id) => {
    const prefix = id[0]
    const category = Object.keys(prfx).find(key => prfx[key] === prefix);

    const tbl = table.table[category];

    const query = `SELECT *
        FROM ${tbl}
        WHERE id = '${id}'`

    const queryRes = Object.values(await fun.queryDb(query))[0]
    if(!queryRes) return
    
    const asset = fun.parseAssetDb(queryRes)

    return asset
}