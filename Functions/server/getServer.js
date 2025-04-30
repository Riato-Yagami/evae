const prxs = table.prefix

module.exports = async (guild) => {
    return await getServer(guild)
}

async function getServer(guild){
    const guildID = guild? guild.id : null

    var dbGet = `SELECT * FROM server
    `
    if(guildID){
        dbGet += `WHERE guild = '${guildID}'`
    }else{
        dbGet +=`ORDER BY date`
    }
    
    const queryRes = await fun.queryDb(dbGet)
    if(!queryRes) return null

    if(queryRes.length == 0){
        await fun.addServer(guild)
        return(await getServer(guild))
    }

    if(queryRes.length == 1){
        guild = fun.getGuild(guild.id)
        const guildDb = queryRes[0]

        guild.prefix = guildDb.categories

        if(!guild.prefix || guild.prefix == ''){
            guild.prefix = ''
            Object.values(prxs).forEach(prx => guild.prefix += prx)
        }

        guild.language = guildDb.lang
        guild.fandomMode = guildDb.fandomMode
        guild.date = guildDb.date
        guild.nsfw = guildDb.nsfw

        return guild
    } 
    return queryRes
}