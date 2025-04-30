const tbl = table.table.fandom

module.exports = async fandom => {

    fandom = fun.encode(fandom)
    
    const selectQuery = `SELECT *
        FROM ${tbl}
        JOIN fandomQueue
        ON fandomQueue.id = ${tbl}.id
        WHERE ${tbl}.fdTag = '${fandom}'
        LIMIT 1`

    const queryRes = await fun.queryDb(selectQuery)
    // console.log(queryRes)
    if(!queryRes) return

    const assetDb = queryRes[0]
    if(!assetDb) return
    
    const asset = fun.parseAssetDb(assetDb)

    const deleteQuery = `DELETE FROM fandomQueue 
    WHERE id = '${asset.id}'`

    const countQuery = `SELECT COUNT(*) as count
        FROM ${tbl}
        JOIN fandomQueue
        ON fandomQueue.id = ${tbl}.id
        WHERE ${tbl}.fdTag = '${fandom}'`

    asset.queue = true

    await fun.queryDb(deleteQuery)

    const queryCountRes = await fun.queryDb(countQuery)
    asset.queueLength = queryCountRes[0].count
    
    return asset
}