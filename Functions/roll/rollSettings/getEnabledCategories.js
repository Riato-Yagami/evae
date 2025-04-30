const prxs = table.prefix

module.exports = async (guildID) =>{
    const query = `SELECT categories
    FROM server
    WHERE guild = '${guildID}'`

    let cts = Object.values((await fun.queryDb(query)))[0].categories

    // console.log(cts)

    if(!cts){
        cts = ''
        Object.values(prxs).forEach(prx => cts+= prx)
    }

    return cts
}