module.exports = async _ => {
    const gameID = await fun.queryRandomGame(bot)
    
    if(gameID == null) return null

    const gameQuery = await fun.queryGame(gameID)

    return gameQuery
}