const prx = table.prefix
const spe = table.special

module.exports = {
    name : "rollsettings",
    sort : 10,
    description: `Server Settings`,
    ldscr : "Customize your server settings",
    permission : 0,
    dm: false,
    example : `/rollsettings enable: True category: ${prx.film}${prx.game}`
    +`\n/rollsettings enable: False category: onepiece ${spe.separator} color`,
    options : [
        {
            type: "Boolean",
            name: "enable",
            description: `true -> enable, false -> disable`,
            ldscr: `Choose whether to Enable or Disable a category or fandom`
            +` (**true** by default)`,
            required: false
        },
        {
            type: "String",
            name: "categories",
            description: `category tags`,
            ldscr: `Enable or Disable category from global rolls`
            +`\n You can enter multiple categories at once ex: "wpf"`,
            required: false
        },
        {
            type: "String",
            name: "fandoms",
            description: `fandom to enable or disable`,
            ldscr: `Enable or Disable fandom from global rolls`,
            required: false
        },
        {
            type: "Integer",
            name: "fandommode",
            description: `default : 0, whitelist: 1, blacklist: -1`,
            ldscr: `In the default mode all fandoms added on mudae can be rolled`
            +`\nChoose whitelist mode to only roll enabled fandom`
            +`\nChoose blacklist mode to never roll disabled fandom`,
            required: false
        }
    ],

    async run(message,args){
        

        const enable = !(args.getBoolean("enable") != null && !args.getBoolean("enable"))
        const ctStr = (args.getString('categories') || '').replace(/\s/g,'')
        const fdStr = (args.getString('fandoms') || '').replace(/\s/g,'')

        let fandomMode = args.getInteger("fandommode")

        const cts = fun.categoryString(ctStr)
        const fds = fdStr.split(spe.separator).filter(str => str !== "")
        // console.log(fdStr)
        // console.log(cts)

        const ects = await fun.enableCategories(message.guild,cts,enable)

        if(!ects){
            fun.reply(message,`‼️ You can't disable every categories ‼️`)
            return
        }

        var guild = message.guild
        
        guild.fandom = []
        var fdError = []

        for await (const fd of fds) {
            var fdDb = await fun.getFd(fd)

            if(!fdDb){
                fdDb = await fun.addFandom(message,fd)
            }else{
                fdDb = fdDb[0]
            }

            if(fdDb){
                fdDb.enabled = enable
                guild.fandom.push(fdDb)
            }else{
                fdError.push(fd)
            }
        }

        // console.log(fdsDb)
        guild.fandom.forEach(fd => {
            fun.enableFandom(guild,fd.tag,enable)
        });

        if(fandomMode != null){
            fandomMode = Math.min(1,Math.max(-1,fandomMode))
            guild.fandomMode = fandomMode
            fun.setFandomMode(guild.id,fandomMode)
        }
        embed = await fun.serverInfoEmbed(guild,true)

        fun.reply(message,{embeds: [embed]})
    }
}