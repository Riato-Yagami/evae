module.exports = guildID => {
    // console.log(bot.guilds.cache.get(guildID))
    
    let guild = bot.guilds.cache.get(guildID)
    
    if(guild){
        if(!guild.name) guild.name = "Server"
        if(!guild.iconURL()) guild.iconURL = avatar
        // console.log(guild.iconURL)
    }else{
        guild = {
            id : guildID,
            name : (guildID == "web")? "WEB" : "UNKNOWN",
            left : true,
        }
    }

    return guild
}

function avatar(){
    return 'https://cdn-icons-png.flaticon.com/512/3481/3481427.png'
}