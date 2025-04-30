module.exports = async ( guild, date, top = false) => {
    var guildID
    if(guild) guildID = guild.id

    date = new Date(date).toISOString({timeZone: 'Europe/Paris'}).slice(0, 10)

    var dbQuery = ``

    if(guild){
        dbQuery += `JOIN player
        ON history.playerID = player.playerID
        WHERE player.guild = '${guildID}'`
    }

    if(dbQuery == ``){
        dbQuery += `WHERE`
    }else{
        dbQuery += `AND`
    }

    dbQuery +=` DATE(history.date) = '${date}' `

    if(top){
        // dbQuery += `ORDER BY power DESC`
        dbQuery += `HAVING power = MAX(power)`
    }else{
        dbQuery += `ORDER BY history.date ASC`
    }
    
    assets = await fun.queryAssets( null, dbQuery)

    return assets
}