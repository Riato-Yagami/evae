module.exports = {
    name : "powerup",
    sort : 3,
    description : "Power up asset",
    ldscr : `Power up your assets in order to have better odds during combats.`
    +`\nYou can increase your power bank by clicking the ${emojies.power} buttons when they appears in rolls.`
    +`\nCheck your power bank with /profile`,
    example : '/powerup asset: g tattooz power: 1200\n',
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "String",
            name: "asset",
            description: `Powered up asset`,
            ldscr: `Choose an asset to power up`,
            required: true
        },
        {
            type: "Integer",
            name: "power",
            description: `power up value`,
            ldscr: `Choose by how much you want to power up your asset`,
            required: true
        },
    ],

    async run(message,args){
        
        const search = args.getString('asset')
        const power = args.getInteger('power')

        var asset = await fun.search(message, search)

        // console.log(asset.powerUp)
        if(typeof asset === "string"){
            fun.reply(message, `No ${asset} : ***${search.trim()}*** found`)
            return
        }

        if(Array.isArray(asset)){
            asset = asset[0]
        }

        var owner = await fun.owner(asset, message)

        if(!owner || owner.id != message.user.id){
            fun.reply(message, `You do not own: ${fun.parseTitle(asset)}`)
            return
        }

        const powerBank = message.player.powerBank

        if(powerBank < power){
            fun.reply(message, `You have only **${powerBank}** ${emojies.power} in your bank`)
            return
        }

        fun.powerUp(message.guild.id,asset.id,power)

        const embed = fun.powerUpEmbed(asset,power)

        fun.reply(message,{embeds : [embed]})

        const query = `UPDATE player
            SET powerBank = powerBank - ${power}
            WHERE user = '${message.user.id}'
            AND guild = '${message.guild.id}'
            `
    
        fun.queryDb(query)
    }
}