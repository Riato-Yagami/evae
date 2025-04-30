const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const prx = table.prefix

module.exports = async (asset, message, replyEmbed, _, search = false, waitButtons) => {

    const replyData = { embeds: [replyEmbed], fetchReply: !search}

    await fun.reply(message,replyData)

    react(asset, message, replyEmbed, null, search, waitButtons)
}

async function react(asset, message, replyEmbed, reply, search, waitButtons){
    if(waitButtons){
        const buttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('leftId')
                .setEmoji('⏳')
                .setStyle(ButtonStyle.Primary)
                .setDisabled(),
            new ButtonBuilder()
                .setCustomId('rightId')
                .setEmoji(emojies.next)
                .setStyle(ButtonStyle.Primary)
                .setDisabled()
        );
        fun.reply(message,{components: [buttons]})
        return
    }

    const owner = await fun.owner(asset,message)     
    // console.log(owner)

    if(owner){ await fun.ownedEmbed( message, replyEmbed, owner, waitButtons, asset)
        const replyData = { embeds: [replyEmbed], fetchReply: false}
        fun.reply(message,replyData)
        if((owner != message.user) 
        && ((await fun.getDayState(message)) == 'war'
        || config.beta
        )
        ){
            fun.attackReaction(asset, message, owner)
        }
    }
    else if(!search){
        fun.claimReaction(asset, message, replyEmbed)
        fun.energyReaction(asset, message, replyEmbed)
    } 
    if(asset.id.charAt(0) == prx.music) fun.playReaction(asset, message, replyEmbed, reply, bot)

    if(search){
        fun.historyButton(message,asset,replyEmbed)
    }
}