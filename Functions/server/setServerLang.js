module.exports = async (server,lg) => {

    const guildID = server.id // Server ID

    const dbInsertServer = `UPDATE server
    SET lang = '${lg}'
    WHERE guild = '${guildID}'`

    fun.queryDb(dbInsertServer)
    
}