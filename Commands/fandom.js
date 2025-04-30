const listLength = 20

module.exports = {
    name : "fandom",
    sort : 9,
    description : "Get added fandom list",
    ldscr : "Get information on added fandom",
    permission : "Aucune",
    dm: false,
    options:[
        {
            type: "boolean",
            name: "server",
            description: "Get server custom fandom",
            required: false
        },
        {
            type: "boolean",
            name: "enabled",
            description: "Only see (true) or disabled (false) fandom",
            required: false
        }
    ],

    async run(message,args){
        

        const server = args.getBoolean("server") || false
        const enabled = args.getBoolean("enabled")

        var fds
        if(server){
            fds = await fun.getFd(null,message.guild)
        }else{
            fds = await fun.getFd()
        }

        if(fds && enabled != null){
            fds = fds.filter(fd => fd.wL == enabled)
        }

        if(!fds || fds == []){
            fun.reply(message,'There are no Fandoms in this list')
            return
        }

        const subArrs = fun.subArray(fds,listLength)
        
        var embeds = []

        subArrs.forEach(subArr => {
            embeds.push(fun.fandomListEmbed(subArr))
        });

        fun.displayPages(message,embeds,'fandom',fds.length);

    }
}