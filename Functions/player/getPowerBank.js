module.exports = async (userID,guildID) => {
    var query = `SELECT SUM(powerBank) FROM player
    `

    if(userID){
        query += `WHERE user = '${userID}'
        `
    }
    
    if(guildID){
        query += `${userID? 'AND' : 'WHERE'} guild = '${guildID}'
        `
    }

    const queryRes = await fun.queryDb(query)

    return Number(Object.values(queryRes[0])[0])
}