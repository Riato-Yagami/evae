const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

module.exports = async ( message, embeds, countName = null, count = 0, page = 0) =>{
    const pageCount = embeds.length - 1
    page = Math.abs(page)
    page %= pageCount+1

    const isArray = Array.isArray(embeds[0])
    for (let i = 0; i < embeds.length; i++) {
        if(isArray){
            embeds[i].forEach(embed => {
                fun.pageEmbed(embed,pageCount,i,countName,count)
            });
        }else{
            fun.pageEmbed(embeds[i],pageCount,i,countName,count)
        }
    }

    var response = await getPage(message,embeds,page)

    if(pageCount < 1) return

    const rightId = fun.createId("right");
    const leftId = fun.createId("left");

    const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(leftId)
            .setEmoji(emojies.previous)
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId(rightId)
            .setEmoji(emojies.next)
            .setStyle(ButtonStyle.Primary)
    );

    const filter = interaction => interaction.customId === rightId || interaction.customId === leftId;

    const collector = response.createMessageComponentCollector({ filter, time: 500000});

    collector.on('collect', async i => {
        // console.log(i.customId)
        if(i.customId == rightId){
            page++;
            if(page > pageCount) page = 0;
        }else if(i.customId == leftId){
            page--;
            if(page < 0) page = pageCount;
        }
        // console.log(i.customId)
        await getPage(message,embeds,page)
        await i.update({ components: [buttons] });
        fun.handleInteraction(i)
    });

    collector.on('end', async _ => {
        const noButtons = {components: []}
        if(message.editReply) fun.reply(message,noButtons)
        else message.edit(noButtons)
    });

    const embedButtons = {components: [buttons]}
    if(message.editReply) fun.reply(message,embedButtons)
    else message.edit(embedButtons)
}

async function getPage(message, embeds, page){
    var embed = embeds[page]
    // console.log(embed)

    if(Array.isArray(embeds[0])){
        replyData = {embeds : embed}
    }else{
        replyData = {embeds : [embed]}
    }
    if(message.editReply) return await fun.reply(message,replyData)
    else return await message.edit(replyData)
}