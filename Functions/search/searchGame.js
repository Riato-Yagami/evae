module.exports = async (search) => {
    const gameID = await fun.querySearchGame(search)
    // console.log(apiPath)
    
    if(gameID == null) return null

    const gameQuery = await fun.queryGame(gameID)
    return gameQuery
}