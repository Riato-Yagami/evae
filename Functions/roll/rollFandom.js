module.exports = async (message,fdTag) => {
    if(fdTag){
        const fdDb = await fun.getFd(fdTag, null, true)

        if(!fdDb && message){
            await fun.addFandom(message,fdTag)
        }
    }

    if(!fdTag) fdTag = await fun.rollFdTag(message)
    return tryRoll(message,fdTag)
}

async function tryRoll(message,fdTag){
    const search = await fun.queryRandomFandom(fdTag)
    // console.log(search)

    if(!search){
        return `${emojies.no} No fandom with tag : ***${fdTag}*** found`
    } 

    const fandom = await fun.searchFandom(search,fdTag,message)

    return fandom
}