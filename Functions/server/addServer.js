module.exports = async (server) => {

    // console.log(server)
    const guildID = server.id // Server ID
    const servername = fun.encode(server.name).substr(0, 250)

    const dbGetServer = `SELECT guild FROM server
    WHERE guild = '${guildID}'`

    const queryRes = await fun.queryDb(dbGetServer)
    if(!queryRes) return null

    if(queryRes.length > 0) return null

    const dbInsertServer = `INSERT INTO server (guild,servername) 
        VALUES ('${guildID}','${servername}')`;

    await fun.queryDb(dbInsertServer)

    const message = `New server : ${server.name}`
    console.log(message)

    return message
}