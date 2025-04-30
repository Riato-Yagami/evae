const { EmbedBuilder } = require('discord.js');

module.exports = async (message,asset,assailant,owner) => {
    const channel = message.channel
    
    let modal = fun.attackModal(owner,asset)
    let embed = fun.attackEmbed(owner,asset)

    // fun.followUp(message,{embeds : [embed]})
    let response = await fun.inputButton(message,modal,assailant,{embeds : [embed]})
    if(!response){
        fun.followUp(message, `${assailant} 🕙 attack's over`)
        return
    }

    assetSearch = response[0]

    var aAsset = await fun.search(message,assetSearch)

    if(typeof aAsset === "string"){
        const notFoundEmbed = new EmbedBuilder()
            .setDescription(`No ${aAsset} : ***${assetSearch}*** found`)
        fun.followUp(message,{ embeds: [notFoundEmbed]})
        return
    }

    const aOwner = await fun.owner(aAsset, message)
    // console.log(aOwner)
    if(aOwner != assailant){
        const aTitle = fun.parseTitle(aAsset)

        const notOwnedEmbed = new EmbedBuilder()
            .setDescription(`You don't own ${aTitle}`)
        fun.followUp(message,{ embeds: [notOwnedEmbed]})
        return
    }

    const winner = await fun.battle( message, channel, assailant , owner, aAsset, asset)

    // console.log(winner)

    if(winner.id == assailant.id){
        fun.letGo(message,owner,asset,true)
        fun.claim(message,assailant,asset,'attack')
    }else{
        fun.letGo(message,assailant,aAsset,false,'death')
    }
}