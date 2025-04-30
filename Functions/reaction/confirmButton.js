const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = async ( message, user, emoji = emojies.confirm, type = 'confirm', confirmEmoji = emojies.yes, owner) => {
    const buttonId = fun.createId(type);
    var button = new ButtonBuilder()
        .setCustomId(buttonId)
        .setEmoji(emoji)
        .setStyle(owner? ButtonStyle.Danger : ButtonStyle.Primary);

    setButton(message,button,type)
    
    var action = new ActionRowBuilder()
    fun.restoreButtons(message,action)

    var filter
    if(user){
        filter = i => i.customId === buttonId && i.user.id == user.id;
    }else{
        filter = i => i.customId === buttonId
    }

    if(owner){
        filter = i => i.customId === buttonId && i.user.id != owner.id
    }

    // const collector = message.channel.createMessageComponentCollector({ filter, time: 60000});
    
    const replyData = {components: [action]}
    // console.log(!message)
    var response = await fun.reply(message,replyData)
    // console.log(!response)
    
    const collector = response.createMessageComponentCollector({ filter, time: config.collectorTime});

    return new Promise((resolve, reject) => {
        collector.on('collect', async i => {
            i.deferUpdate()
            button.setDisabled().setEmoji(confirmEmoji).setStyle(ButtonStyle.Success)

            setButton(message,button,type)

            var inaction = new ActionRowBuilder()
            fun.restoreButtons(message,inaction)

            const replyData = {components: [inaction]}
            if(message.editReply){fun.reply(message,replyData)} 
            else{message.edit(replyData)}
            
            await fun.handleInteraction(i)
            
            resolve(i)
            // resolve(true)
        });
    
        collector.on('end', async collected => {
            if(collected.size == 0){
                button.setDisabled().setEmoji(emoji).setStyle(ButtonStyle.Secondary)
                
                setButton(message,button,type)
                
                var inaction = new ActionRowBuilder()
                fun.restoreButtons(message,inaction)

                const replyData = {components: [inaction]}
                if(message.editReply){fun.reply(message,replyData)} 
                else{message.edit(replyData)}
        
            }
    
            resolve(false)
        })
    })
}

function setButton(message,button,type) {
    const property = type + "Button";
    if (property) {
        message[property] = button;
    }
}