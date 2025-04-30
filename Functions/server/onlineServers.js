module.exports = _ => {
    var IDs = []
    bot.guilds.cache.forEach(guild => {
        IDs.push(guild.id)
    })
    return IDs
}