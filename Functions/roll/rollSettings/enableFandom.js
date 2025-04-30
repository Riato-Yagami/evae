module.exports = async (guild,fandom,enable) =>{
    const guildID = guild.id

    const dbUpdate = `
    INSERT INTO fandomWhiteList (fdTag,guild,enabled)
    VALUES ('${fandom}', '${guildID}', ${enable})
    ON DUPLICATE KEY UPDATE enabled = ${enable}
    `

    // console.log(dbUpdate)

    fun.queryDb(dbUpdate)
}