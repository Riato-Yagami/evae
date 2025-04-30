const prx = table.prefix
const dscr = require(__basedir + "/botSettings/description")

const prefixRollCost = 3
const optionRollCost = 9

module.exports = {
    name : "roll",
    sort : 1,
    description : "Roll asset",
    ldscr : "Roll a random asset"
    +"\nRolls and claims reset every hour",
    example : '/roll\n'+
    '/roll type: w\n'+
    '/roll type: f fandom: minecraft',
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "String",
            name: "type",
            description: `${dscr.description} - cost ${prefixRollCost}`,
            ldscr : `${dscr.ldscr}\n\nWith a precise type roll will **cost ${prefixRollCost}** instead of **1** by default`,
            required: false
        },
        {
            type: "String",
            name: "fandom",
            description: `fandom tag - cost ${optionRollCost}`,
            ldscr: `You can also add a the **tag** specific fandom to roll`
            +`\n\nWith a precise fandom roll will **cost ${optionRollCost}**`
            ,
            required: false
        },
    ],

    async run(message,args){
        const typeString = args.getString('type')
        var option = args.getString('fandom')

        if(option) option = option.replace(/\s/g,'')

        var prefix
        // var option
        var rollCost = 1
        if(typeString){
            prefix = fun.getPrefix(typeString)[1]
            rollCost = prefixRollCost
        }else{
            prefix = await fun.randomPrefix(message.guild)
        }

        // console.log(prefix)
        
        if(option){
            prefix = prx.fandom
            rollCost = optionRollCost
        } 

        let player = message.player

        const rollLeft = player.rolls + player.bonusRoll
        if(rollLeft - rollCost < 0){
            const rollText = fun.rollText(player)
            var text = `**${message.user}** you have **${rollText}** roll${(rollLeft > 1)? 's' : ''} left`
            if(rollLeft > 0){
                +`\nRolling a specific tag cost **${prefixRollCost}** rolls`
                +`\nRolling a specific tag cost **${optionRollCost}** rolls`
            }
            const timeLeft = fun.getTimeUntilReset()
            text += `\nnext reset in : **${timeLeft}**`
            fun.reply(message,text)
            return
        }

        const asset = await fun.roll(message,prefix,option)

        if(!asset) return

        const replyEmbed = await fun.buildAssetEmbed(message,asset)
        
        player.rolls -= rollCost
        if(player.rolls < 0){
            player.bonusRoll += player.rolls
            player.rolls = 0
        }

        fun.displayRollLeft(message,player)
        await fun.embedReply(asset, message, replyEmbed)

        fun.updatePlayerRoll(player)

        fun.addRollHistory(asset,message.guild,message.user)

        // fun.addToDb(asset, bot)
    }       
}

// function addToHistory(asset,guild,user){
//     const type = "roll"
//     const guildID = guild.id
//     const userID = user.id
//     const assetID = asset.id

//     const dbInsertHistory = `
//     INSERT INTO history (type, assetID, playerID)
//     SELECT '${type}', '${assetID}', playerID
//     FROM player
//     WHERE guild = '${guildID}' AND user = '${userID}'
//     `

//     try {bot.db.query(dbInsertHistory); } catch(error){console.error(error)}
// }