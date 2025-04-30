module.exports = async userID => {
    // let user = bot.users.cache.get(userID)
    var user
    try {
        user = await bot.users.fetch(userID)
    } catch (error) {
        // console.log(error)
    }

    if(user) return user

    user = {
        id : userID,
        username : 'UNKNOWN',
        discriminator : '0000',
        left : true,
        displayAvatarURL : avatar
    }

    const dbGetUser = `SELECT * FROM user
    WHERE user = '${userID}'`

    const queryRes = await fun.queryDb(dbGetUser)

    if(queryRes.length > 0){
        let userDb = queryRes[0]
        user.username = fun.decode(userDb.username)
        user.displayAvatarURL = function displayAvatarURL() {
            return fun.decode(userDb.picture)
        }
        user.discriminator = fun.decode(userDb.discordtag)
    }

    return user
}

function avatar(){
    return 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
}