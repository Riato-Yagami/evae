module.exports = async (guildID,assetID,power) => {
    const query = `SELECT powerUp 
    FROM powerUp
    WHERE asset = '${assetID}'
    AND guild = '${guildID}'`;

    const res = (await fun.queryDb(query))[0]
    return res? res.powerUp : 0;

};