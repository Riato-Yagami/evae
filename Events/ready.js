const loadSlashCommands = require("../Loaders/loadSlashCommands")

const clc = require("cli-color");

module.exports = async _ => {
    
    await fun.connectDb()

    await loadSlashCommands()

    const version = await fun.checkVersion()

    const date = new Date()
    const query = `INSERT INTO boot (version)
    VALUES ('${version}')`

    fun.queryDb(query)

    if(config.beta){
        console.log(`${clc.blue(bot.user.tag)} ${clc.green('v' + version)} online || ${clc.bgBlueBright(await fun.parseDate(null,new Date(),true,'en'))}`)
    }else{
        console.log(`${bot.user.tag} v${version} online || ${await fun.parseDate(null,date,true,'en')}`)
    }

    bot.guilds.cache.forEach(server => {
        fun.addServer(server)
    });

    const appCmds = await bot.application.commands.fetch()

    var cmdIds = []
    for (const [id, command] of appCmds) {
        cmdIds.push({
            name: command.name,
            id: id
        })
    }

    // console.log(cmdIds)

    bot.commands.forEach(cmd => {
        cmdIds.some(function(cmdId) {
            if(cmdId.name == cmd.name){
                cmd.id = cmdId.id
                return true
            }
        });
    });

    fun.playerCount(true)
    fun.rollQueue()
}