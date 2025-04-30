module.exports = async (guildID,assetID,power) => {
    const query = `INSERT INTO powerUp (guild, asset, powerUp)
    VALUES ('${guildID}', '${assetID}', ${power})
    ON DUPLICATE KEY UPDATE powerUp = powerUp + ${power}`;

    fun.queryDb(query);
};