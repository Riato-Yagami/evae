const messageLenght = 10 // between 1 and 10

module.exports = {
    name : "help",
    description : "Get list of commands and their descriptions",
    ldscr : "Evaé's command list",
    permission : "Aucune",
    dm: false,
    options : [
    {
        type: "Boolean",
        name: "dm",
        description: `default: true`,
        ldscr: `Send help info by private message`
        +` (**true** by default)`,
        required: false
    },
    {
        type: "Boolean",
        name: "short",
        description: `default: false`,
        ldscr: `Get command name without description`,
        required: false
    },
    ],

    async run(message,args){
        
        var short = args.getBoolean("short") || false
        var dm = !(args.getBoolean("dm") != null && !args.getBoolean("dm"))

        // message.user.send("Your message here.")

        let commands = await fun.getCommands(bot)
        
        sort(commands)

        // console.log(commands)

        const helpEmbed = fun.helpEmbed(commands,short)

        var dmSent = true
        if(dm){
            for (let i = 0; i < helpEmbed.length; i+=messageLenght) {
                const arr = getSubarray(helpEmbed, i, i+messageLenght-1)
                let sent = await fun.privateMessage(message.user,{embeds: arr})
                // console.log(sent)
                if(!sent) dmSent = false
            }

            if(dmSent){
                fun.reply(message,`Help info was sent to you by private message ${message.user}`)
                return
            }
        }

        await fun.reply(message,{embeds: getSubarray(helpEmbed, 0, messageLenght-1)})

        for (let i = messageLenght; i < helpEmbed.length; i+=messageLenght) {
            const arr = getSubarray(helpEmbed, i, i+messageLenght-1)
            fun.followUp(message,{embeds: arr})
        }
    }
}

function sort(commands){
    const max = commands.length
    commands.sort((a, b) => {
        const A = a.sort || max
        const B = b.sort || max
        if (A < B){
            return -1
        } 
        if (A > B){
            return 1
        }
        return 0
    });
}

function getSubarray(array, fromIndex, toIndex) {
    return array.slice(fromIndex, toIndex+1);
}