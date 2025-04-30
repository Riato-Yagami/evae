module.exports = async (search, fandomName, message) => {
    if(!fandomName) return null

    const fdDb = await fun.getFd(fandomName)

    if(!fdDb){
        await fun.addFandom(message,fandomName)
    }
    
    fandomName = fandomName.replace(/\s/g,'')
    
    const fandomQuery = await fun.queryFandom(search,fandomName)
    
    return fandomQuery
}