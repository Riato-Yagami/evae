module.exports = async (guild,user,count) => {
    // console.log(guild.id)
    return await getPlayer(guild,user,count)
}

async function getPlayer(guild,user,count){
    // console.log(guild)
    var query = `SELECT ${count ? 'COUNT(':''}*${count ? ') AS count':''} FROM player
    `

    if(user){
        query += `WHERE user = '${user.id}'
        `
    }
    
    if(guild){
        query += `${user? 'AND' : 'WHERE'} guild = '${guild.id}'
        `
    } 
    
    query +=`ORDER BY playerID`

    // console.log(query)
    const queryRes = await fun.queryDb(query)
    
    // console.log(queryRes)
    if(!queryRes) return null

    if(queryRes.length == 0 && user){
        await fun.addPlayer(guild,user)
        return(await getPlayer(guild,user))
    }

    if(guild){
        if(!count) player = await fun.playerRollAndClaim(queryRes[0])
        return player
    } 

    
    return queryRes
}