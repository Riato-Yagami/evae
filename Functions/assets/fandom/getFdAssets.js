module.exports = async (tag) => {
    var dbGetFd = `
    SELECT *
    FROM fandom
    WHERE fdTag = '${tag}'
    `

    const fds = await fun.queryDb(dbGetFd)
    if(!fds) return null
    if(fds.length == 0) return null
    
    return fds
}