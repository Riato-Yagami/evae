const prx = table.prefix

module.exports = async prefix =>{
    const category = Object.keys(prx).find(key => prx[key] === prefix);

    const tbl = table.table[category];

    const selectQuery = `SELECT *
        FROM ${tbl}
        JOIN rollQueue
        ON rollQueue.id = ${tbl}.id
        LIMIT 1`

    const queryRes = await fun.queryDb(selectQuery)
    // console.log(queryRes)
    if(!queryRes) return

    const assetDb = queryRes[0]
    if(!assetDb) return
    
    const asset = fun.parseAssetDb(assetDb)

    const deleteQuery = `DELETE FROM rollQueue 
    WHERE id = '${asset.id}'`

    const countQuery = `SELECT COUNT(*) as count
        FROM ${tbl}
        JOIN rollQueue
        ON rollQueue.id = ${tbl}.id`

    asset.queue = true

    await fun.queryDb(deleteQuery)

    const queryCountRes = await fun.queryDb(countQuery)
    asset.queueLength = queryCountRes[0].count
    
    return asset
}