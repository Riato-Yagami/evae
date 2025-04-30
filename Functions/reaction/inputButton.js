const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const type = "input"

module.exports = async (message, modal, user, data, followUp) => {

    const buttonId = fun.createId(type);
    var button = new ButtonBuilder()
        .setCustomId(buttonId)
        .setLabel('Input')
        .setStyle(ButtonStyle.Primary);
    
    var action = new ActionRowBuilder()

    if(followUp){
        action.addComponents(button);
    }else{
        setButton(message,button,type)
        fun.restoreButtons(message,action)
    }

    var filter
    if(user){
        filter = i => i.customId === buttonId && i.user.id == user.id;
    }else{
        filter = i => i.customId === buttonId
    }
    
    var replyData
    if(data){
        replyData = data
        replyData.components = [action]
    }else{
        replyData = {components: [action]}
    }

    var response

    if(followUp){
        response = await fun.followUp(message,replyData)
    }else{
        response = await fun.reply(message,replyData)
    }

    const collector = response.createMessageComponentCollector({ filter, time: config.collectorTime});

    return new Promise((resolve, reject) => {
        collector.on('collect', async i => {
            await fun.handleInteraction(i)
            let reply = await fun.modal(i,modal)

            if(followUp){
                resolve(reply)
                return
            }

            setButton(message,null,type)
            var inaction = new ActionRowBuilder()
            fun.restoreButtons(message,inaction)

            const replyData = {components: [inaction]}

            if(message.editReply){fun.reply(message,replyData)} 
            else{
                message.edit(replyData)
            }

            resolve(reply)
        });
    
        collector.on('end', async collected => {
            if(collected.size == 0){

                if(followUp){
                    resolve(false)
                    return
                }
                
                button.setDisabled().setEmoji(emojies.no).setStyle(ButtonStyle.Secondary)
                
                setButton(message,button,type)
                
                var inaction = new ActionRowBuilder()

                fun.restoreButtons(message,inaction)

                const replyData = {components: [inaction]}
                fun.reply(response,replyData)
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