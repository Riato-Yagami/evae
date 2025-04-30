module.exports = async (search, option) => {

    const apiPath = await fun.querySearchMusic(`${search}${option ? ' ' + option : '' }`)
    // console.log(apiPath)
    
    if(apiPath == null) return null

    const musicQuery = await fun.queryMusic(apiPath)
    return musicQuery
}