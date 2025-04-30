module.exports = async (server) => {
    // console.log(server)
    const guildID = server.id // Server ID

    const dbGetLang = `SELECT lang FROM server
    WHERE guild = '${guildID}'`

    const queryRes = await fun.queryDb(dbGetLang)

    if(!queryRes) return 'en'
    // console.log(queryRes)
    return queryRes[0].lang
}