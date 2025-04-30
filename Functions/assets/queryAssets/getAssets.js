module.exports = async ( userID, guildID, date, top, prefixs,count,power) => {
    var dbQuery = ``

    if(userID || guildID){
        dbQuery+= `WHERE `
        if(guildID) dbQuery += `player.guild = '${guildID}' `
        if(userID && guildID) dbQuery += `AND `
        if(userID) dbQuery += `player.user = '${userID}' `
    }

    if(date){
        date = new Date(date).toISOString({timeZone: 'Europe/Paris'}).slice(0, 10)
        if(dbQuery != ``){
            dbQuery+= `AND `
        }else{
            dbQuery+= `WHERE `
        }
        dbQuery +=` DATE(history.date) = '${date}' `
    } 

    // dbQuery += `HAVING power = MAX(power)`
    if(top) dbQuery += `ORDER BY power DESC LIMIT 1`
    
    assets = await fun.queryAssets( prefixs, dbQuery, count, power)

    // console.log(assets)
    return assets
}