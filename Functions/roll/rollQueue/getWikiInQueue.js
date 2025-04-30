const tbl = table.table.wiki

module.exports = async lang => {
    const selectQuery = `SELECT *
        FROM ${tbl}
        JOIN wikiQueue
        ON wikiQueue.id = ${tbl}.id
        WHERE wikiQueue.id LIKE 'w${lang}%'
        LIMIT 1`

    const queryRes = await fun.queryDb(selectQuery)
    // console.log(queryRes)
    if(!queryRes) return

    const assetDb = queryRes[0]
    if(!assetDb) return
    
    const asset = fun.parseAssetDb(assetDb)

    const deleteQuery = `DELETE FROM wikiQueue 
    WHERE id = '${asset.id}'`

    const countQuery = `SELECT COUNT(*) as count
        FROM ${tbl}
        JOIN wikiQueue
        ON wikiQueue.id = ${tbl}.id
        WHERE wikiQueue.id LIKE 'w${lang}%'`

    asset.queue = true

    await fun.queryDb(deleteQuery)

    const queryCountRes = await fun.queryDb(countQuery)
    asset.queueLength = Object.values(queryCountRes)[0].count
    
    return asset
}