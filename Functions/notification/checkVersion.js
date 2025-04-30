const version = require(__basedir + '/ressources/text/changelog.js').logs[0].version

module.exports = async _ => {

    const queryVersion = `SELECT version
    FROM boot
    ORDER BY bootID DESC
    LIMIT 1`

    const queryVersionRes = await fun.queryDb(queryVersion)
    
    if(!queryVersionRes) return version

    var oldVersion
    if(Object.values(queryVersionRes).length > 0){
        oldVersion = Object.values(queryVersionRes)[0].version
    }

    if(version != oldVersion
        // || true
        ){

        const log = await fun.changelogEmbed(null,true)
        // console.log(log)
        const queryUsers = `SELECT user
        FROM user
        WHERE updateNotification = 1`

        const users = await fun.queryDb(queryUsers)

        users.forEach(async u => {
            const user = await fun.getUser(u.user)
            if(!user.left){
                const data = {embeds : [log]}
                fun.privateMessage(user,data)
            }
            
        });

        console.log(`UPDATE v${oldVersion} -> v${version}`)
    }

    return version
}