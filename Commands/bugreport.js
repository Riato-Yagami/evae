const urlRegex = /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

module.exports = {
    name : "bugreport",
    sort : 9,
    description : "Report Evaé disfunction",
    ldscr : "If you expereince a bug witrh Evaé please report it using this command"
    +'for futher help you can join [Evae official Discord](https://discord.gg/dkacK7xHDJ)',
    example : '/bugreport object: broken roll g'
    + ' description: when rolling the game category the bot doesn\'t respond'
    + ' command: roll'
    + ' image: https://media.discordapp.net/attachments/504338210504310795/1101182083201769604/image.png?width=720&height=339',
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "String",
            name: "object",
            description: 'Short description',
            ldscr: 'Describe your bug with a short title or sentence'
            +'\n max 150 characters',
            required: true
        },
        {
            type: "String",
            name: "description",
            description: 'Bug description',
            ldscr: 'Go through details of what happended'
            +'\n max 4000 characters',
            required: true
        },
        {
            type: "String",
            name: "command",
            description: 'Command causing the bug',
            ldscr: 'If your bug was caused by a command, add it here',
            required: false
        },
        {
            type: "String",
            name: "image",
            description: 'bug illustration URL',
            ldscr: 'If you have a picture of your bug you can add its link here.'
            + '\n Tips : you can take a screenshot upload it onto Discord and copy its link !',
            required: false
        },
    ],

    async run(message,args){

        let report = {
            object : args.getString('object'),
            description : args.getString('description'),
            command : args.getString('command'),
            illustration : args.getString('image'),
            user : message.user,
            guild : message.guild,
            errors : []
        }

        let reportDb = {
            object : fun.encode(report.object),
            description : fun.encode(report.description),
            player : message.player.playerID
        }

        if(report.illustration && !urlRegex.test(report.illustration)){
            report.errors.push('Invalid **image URL**')
            report.illustration = false
        }

        if(report.command) reportDb.command = fun.encode(report.command)
        if(report.illustration) reportDb.illustration = fun.encode(report.illustration)

        if(reportDb.illustration && reportDb.illustration.length > 360){
            report.errors.push('**Image URL** is to long')
            reportDb.illustration = false
        }

        if(reportDb.object.length > 180){
            report.errors.push('**Object** is to long')
            report.object = fun.cutString(report.object,150,false)
        }

        // console.log(reportDb.description.length)

        if(reportDb.description.length > 4500){
            report.errors.push('**Description** is to long')
            report.description = fun.cutString(report.description,4000)
        }

        let commands = await fun.getCommands()
        let cmdName = []

        commands.forEach(cmd => {
            cmdName.push(cmd.name)
        });

        if(report.command && !cmdName.includes(report.command)){
            report.errors.push('Invalid command name')
            report.command = false
        }

        const embed = await fun.bugReportEmbed(report)

        let reply = await fun.reply(message, {embeds : [embed]})

        if(report.errors.length > 0) return

        const collected = await fun.confirmButton(message,message.user,emojies.post)

        // console.log(collected)

        if(collected){

            fun.privateMessage(await fun.getUser(config.devID),{embeds : [embed]})

            let query = `INSERT INTO bugReport (object,description,playerID`
            
            if(reportDb.command) query += `,command`
            if(reportDb.illustration) query += `,illustration`

            query += `)
            VALUES ('${reportDb.object}','${reportDb.description}',${reportDb.player}`

            if(reportDb.command) query += `,'${reportDb.command}'`
            if(reportDb.illustration) query += `,'${reportDb.illustration}'`

            query += `)`

            fun.queryDb(query)
        }
    }
}