module.exports = async (fandom, guildID, enabled) => {
    const minPageCount = 500
    var dbGetTag = `
    SELECT fandomTag.fdTag
    FROM fandomTag
    `
    if(guildID && enabled){
        if(guildID) dbGetTag += 
        `JOIN fandomWhiteList ON fandomTag.fdTag = fandomWhiteList.fdTag
        WHERE fandomWhiteList.guild = '${guildID}'
        AND enabled = ${enabled}`
    }else if(guildID && !enabled)
    {
        dbGetTag += `LEFT JOIN fandomWhiteList 
        ON fandomTag.fdTag = fandomWhiteList.fdTag
        WHERE (guild IS NULL OR guild = '${guildID}')
        AND (enabled IS NULL OR enabled = 1)
        AND whitelist = 1
        AND pageCount > ${minPageCount}
        `
    }else if(fandom){
        dbGetTag += `WHERE fdName = '${fun.encode(fandom.fdName)}'`
    }else{
        dbGetTag += `WHERE whitelist = 1
        AND pageCount > ${minPageCount}
        `
    }

    // console.log(dbGetTag)
    const tags = await fun.queryDb(dbGetTag)
    if(!tags) return null
    if(tags.length == 0) return null

    return tags
}