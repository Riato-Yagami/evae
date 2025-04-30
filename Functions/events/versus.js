const action = require(__basedir + "/botSettings/action")
const aEmo = action.emoji
const aCol = action.color
const dEmo = require(__basedir + "/botSettings/day").emoji
// const { PermissionsBitField } = require('discord.js');
var tradeUsers = []

module.exports = async (message,args,trading,gift) => {
    var trady = args.getUser("member")
    var trader = message.user

    const dayState = await fun.getDayState(message)
    var calendarStr = '\n check /calendar to see the next time you will be able to.'
    calendarStr = fun.parseTextCmd(calendarStr)
    

    if(!config.beta){
        switch (dayState) {
            case 'peace':
                if(!trading && !gift){
                    fun.reply(message,`${trader}, you cannot challenge while ${dEmo.peace}${calendarStr}`)
                    return
                } 
                break;
            case 'neutral':
                if(gift){
                    fun.reply(message,`${trader}, you cannot give while ${dEmo.neutral}${calendarStr}`)
                    return
                } 
                break;
            case 'war':
            case 'tense':
                if(trading || gift){
                    fun.reply(message,`${trader}, you cannot ${trading? 'trade' : 'give'} while ${dEmo.tense} or ${dEmo.war}${calendarStr}`)
                    return
                } 
                break;
        }
    }

    if(trady.bot){
        fun.reply(message,`${trader}, you cannot ${gift? 'give to' : (trading? 'trade with' : 'challenge')} a **bot**`)
        return
    }

    if(await inTrade(trader,message.guild)){
        fun.reply(message,`${trader}, you are already involved in a trade or challenge`)
        return
    }

    if(await inTrade(trady,message.guild)){
        fun.reply(message,`${trader}, **${trady.username}** is already involved in a trade or challenge`)
        return
    }

    if(trader == trady){
        fun.reply(message,`Can't ${gift? 'give to' : (trading? 'trade with' : 'challenge')} yourself`)
        return
    }

    if(!gift){
        await addTradeUser(trader,message.guild)
        await addTradeUser(trady,message.guild)
    }

    const searchString = args.getString('assets')

    trader.assets = await fun.multipleSearch( message,searchString)

    await fun.sortOwned( trader.assets, trader, message)

    if(!trading) trader.power = fun.totalPower(trader.assets.owned)

    const replyEmbeds = tradeEmbed(trader,trady,trading,gift,false)

    let reply = await fun.reply(message,{ embeds: replyEmbeds })

    if(trader.assets.owned.length == 0){
        endTrade(message,trader,trady)
        return
    } 

    collected = await fun.confirmButton(message,trader)

    if(collected){
        if(gift){
            give(message,trader,trady)
            return
        } 
        const replyEmbed = tradeEmbed(trader,trady,trading,gift,true)
        fun.reply(message,{ embeds: replyEmbed })
        awaitTrady(message,trader,trady,trading,gift)
    }else{
        endTrade(message,trader,trady)
    }
}

function tradeEmbed(from,to,trading,gift,final) {
    return fun.tradeEmbed( from.assets, tradeStr(from,to,trading,gift,final), final, !(trading || gift))
}

function tradeStr(from,to,trading,gift,final) {
    if(gift && final) return `${to.username} do you accept the gift from ${from.username}?`
    return `${gift? 'give to' : (trading? 'trade with' : 'challenge')} **${to.username}** ${(trading || gift)? '' : `with ${fun.parseNumber(from.power)}${emojies.power}`}`
}

async function awaitTrady(message,trader,trady,trading,gift) {
    var tradySearch

    let embed = fun.versusEmbed(trader,trady,gift,trading)
    
    let modal = fun.attackModal(trader)
    let response = await fun.inputButton(message,modal,trady, {embeds : [embed]},true)

    if(!response){
        fun.followUp(message, `${trady} 🕙 ${trading? 'trade' : 'challenge'}'s over`)
        endTrade(message,trader,trady)
        return
    }

    tradySearch = response[0]

    // fun.delete(reply)
    // fun.delete(tradyReply)

    if(!tradySearch){
        endTrade(message,trader,trady)
        return
    }

    trady.assets = await fun.multipleSearch( message,tradySearch)

    await fun.sortOwned( trady.assets, trady, message)

    if(!trading) trady.power = fun.totalPower(trady.assets.owned)

    const followUpEmbeds = tradeEmbed(trady,trader,trading,gift,false)

    reply = await fun.followUp(message,{ embeds: followUpEmbeds})
    
    if(trady.assets.owned.length == 0){
        endTrade(message,trader,trady)
        return
    } 

    collected = await fun.confirmButton(reply,trady)

    if(collected){
        const replyEmbed = tradeEmbed(trady,trader,trading,gift,true)
        reply.edit({ embeds: replyEmbed })

        awaitTrader(message,trader,trady,trading,gift)
    }else{
        endTrade(message,trader,trady)
    }
}

async function awaitTrader(message,trader,trady,trading,gift) {

    let reply = await fun.followUp(message,`${trader}, ${trading? 'accept the trade': 'go to battle'}?`)

    collected = await fun.confirmButton(reply,trader,trading? aEmo.trade : aEmo.challenge)

    if(collected){
        if(trading){trade(message,trader,trady)}
        else{battle(message,trader,trady)}
    }
}

async function trade(message,trader,trady) {

    for await (const asset of trader.assets.owned) {
        await fun.letGo(message,trader,asset,true)
        await fun.claim(message,trady,asset,'trade')
    }

    for await (const asset of trady.assets.owned) {
        await fun.letGo(message,trady,asset,true)
        await fun.claim(message,trader,asset,'trade')
    }

    endTrade(message,trader,trady)
}

async function give(message,trader,trady){
    fun.followUp(message,`${trady}`)
    const giftEmbed = tradeEmbed(trader,trady,false,true,true)

    let reply = await fun.reply(message,{embeds : giftEmbed})

    let collected = await fun.confirmButton(reply,trady,aEmo.gift)

    if(collected){
        for await (const asset of trader.assets.owned) {
            await fun.letGo(message,trader,asset,true)
            await fun.claim(message,trady,asset,'gift')
        }
    }
}

async function battle(message,trader,trady) {

    const winner = await fun.battle( message, message.channel, trader , trady, trader.power, trady.power)
    var loser = trader

    if(winner.id == trader){
        loser = trady
    }

    for await (const asset of loser.assets.owned) {
        await fun.letGo(message,loser,asset,true)
        await fun.claim(message,winner,asset,'challenge')
    }

    endTrade(message,trader,trady)
}

async function inTrade(user,guild) {
    const player = await fun.getPlayer(guild,user)
    return tradeUsers.includes(player.playerID)
}

function endTrade(message,trader,trady) {
    removeTradeUser(trady,message.guild)
    removeTradeUser(trader,message.guild)
}

async function addTradeUser(user,guild){
    const player = await fun.getPlayer(guild,user)
    tradeUsers.push(player.playerID)
}

async function removeTradeUser(user,guild){
    const player = await fun.getPlayer(guild,user)
    removeFromArray(player.playerID,tradeUsers)
}

function removeFromArray(value,array){
    const index = array.indexOf(value);
    if (index > -1) { // only splice array when item is found
        array.splice(index, 1); // 2nd parameter means remove one item only
    }
}