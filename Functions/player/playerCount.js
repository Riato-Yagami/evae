module.exports = async (count = true) => {
    const IDs = fun.onlineServers()
    
    let query = `SELECT DISTINCT ${count?'COUNT(' :''}player.user${count?') as count' :''} FROM player
    WHERE guild IN (${IDs})`

    const queryRes = await fun.queryDb(query)
    
    if(count) bot.user.setActivity(`${IDs.length} ${emojies.server} ${queryRes[0].count} ${emojies.user}`)

    return queryRes
}