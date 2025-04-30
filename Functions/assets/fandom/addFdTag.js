module.exports = async (fandom,whitelist = 1) => {
    // const dbInsertTag = `
    // INSERT IGNORE INTO fandomTag (fdTag,fdName)
    // VALUES ('${fun.encode(fandom.fdTag)}','${fun.encode(fandom.fdName)}')
    // `
    fandom.whitelist = whitelist
    initialyzeTagDb(fandom)

    const dbInsertTag = `
    REPLACE INTO fandomTag (fdTag, fdName, pageCount, whitelist)
    SELECT '${fun.encode(fandom.fdTag)}', '${fun.encode(fandom.fdName)}', ${fandom.pageCount}, ${whitelist}
    FROM fandomTag
    WHERE NOT EXISTS (
    SELECT 1 FROM fandomTag
    WHERE fdName = '${fun.encode(fandom.fdName)}'
    AND LENGTH(fdTag) <= LENGTH('${fun.encode(fandom.fdTag)}')
    ) OR fdName NOT IN (SELECT fdName FROM fandomTag);`

    fun.queryDb(dbInsertTag)

    return fun.parseFdSite(fandom)
}

async function initialyzeTagDb(fandom){
    addedTags = await fun.getFdTag()
    // console.log(addedTags)
    if(!addedTags){
        const dbInsertFirstTag = `
        INSERT INTO fandomTag (fdTag, fdName, pageCount)
        VALUES ('${fun.encode(fandom.fdTag)}', '${fun.encode(fandom.fdName)}', ${fandom.pageCount})
        `
        try {bot.db.query(dbInsertFirstTag); } catch(error){console.error(error)}
    }
}