module.exports = async (server) => {
    // console.log(server)
    const guildID = server.id // Server ID

    const dbGetNsfw = `SELECT nsfw FROM server
    WHERE guild = '${guildID}'`

    const queryRes = await fun.queryDb(dbGetNsfw)

    return queryRes[0].nsfw == 1
}