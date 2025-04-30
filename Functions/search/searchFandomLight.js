module.exports = async (search, fandomName) => {
    if(!fandomName) return null
    const fandomQuery = await fun.queryFandom(search,fandomName)
    if(fandomQuery == null) return null

    const fandom = await fun.parseFandomQueryLight(fandomQuery,bot)
    
    return fandom
}