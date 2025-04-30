module.exports = async (server,nsfw) => {
    const nsfwStr = nsfw? 'true' : 'false'

    const guildID = server.id // Server ID

    const dbInsertServer = `UPDATE server
    SET nsfw = ${nsfwStr}
    WHERE guild = '${guildID}'`

    fun.queryDb(dbInsertServer)
    
}