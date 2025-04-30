module.exports = (guildID,fandomMode) => {
    const query = `UPDATE server
    SET fandomMode = ${fandomMode}
    WHERE guild = '${guildID}'`

    fun.queryDb(query)
}