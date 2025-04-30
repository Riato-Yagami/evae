module.exports = (asset,guild,user) => {
    const type = "roll"
    const guildID = guild.id
    const userID = user.id
    const assetID = asset.id

    const dbInsertHistory = `
    INSERT INTO history (type, assetID, playerID)
    SELECT '${type}', '${assetID}', playerID
    FROM player
    WHERE guild = '${guildID}' AND user = '${userID}'
    `

    try {bot.db.query(dbInsertHistory); } catch(error){console.error(error)}
}