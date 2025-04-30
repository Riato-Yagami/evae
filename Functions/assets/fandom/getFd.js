module.exports = async (tag,guild,onlyTag,roll = false) => {
    var dbGetFd = `
    SELECT DISTINCT ${onlyTag? 'f.fdTag' : 'f.*'} ${guild? ', w.enabled' : ''}
    FROM fandomTag f
    `

    // guild.fandomMode = -1
    if(tag) dbGetFd += `WHERE fdTag = '${fun.encode(tag)}'`
    // console.log(guild.fandomMode)
    if(guild){
        switch (true){
            case guild.fandomMode == 0 || !roll:
                dbGetFd += `
                JOIN fandomWhiteList w ON f.fdTag = w.fdTag
                WHERE w.guild = '${guild.id}'
                `
                if(roll){
                    dbGetFd += `AND f.whitelist = 1
                    AND f.pageCount > 500`
                }
            break;
            case guild.fandomMode == -1 :
                dbGetFd += `
                LEFT JOIN fandomWhiteList w 
                ON f.fdTag = w.fdTag AND w.guild = 504338059936923658
                WHERE w.fdTag IS NULL OR (w.enabled = 1 AND w.fdTag IS NOT NULL)
                `
                if(roll){
                    dbGetFd += `AND f.whitelist = 1
                    AND f.pageCount > 500`
                }
            break;
            case guild.fandomMode == 1 :
                dbGetFd += `
                LEFT JOIN fandomWhiteList w ON f.fdTag = w.fdTag
                WHERE w.guild = '${guild.id}'
                AND w.enabled = 1`
            break
        }
    }else if(roll){
        dbGetFd += `WHERE f.whitelist = 1
        AND f.pageCount > 500`
    }

    // console.log(dbGetFd)
    const fdsDb = await fun.queryDb(dbGetFd)
    if(!fdsDb) return null
    if(fdsDb.length == 0) return null

    var fds = []
    fdsDb.forEach(fd => {
        if(onlyTag){
            fds.push({tag: fd.fdTag})
        }
        else{
            fds.push(fun.parseFdSite(fd))
        }
    });
    
    return fds
}