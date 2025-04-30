module.exports = async (user) => {
    const userID = user.id
    const username = fun.encode(user.username).substr(0, 250)
    const discordTag = fun.encode(user.discriminator)
    const picture = fun.encode(user.displayAvatarURL())
    const query = `INSERT INTO user (user, username, discordtag,picture)
    VALUES ('${userID}', '${username}', '${discordTag}', '${picture}')
    ON DUPLICATE KEY UPDATE 
        username = '${username}',
        discordtag = '${discordTag}',
        picture = '${picture}';`;

    const res = await fun.queryDb(query)
    return res
}