module.exports = async (message,embed,fandom) => {

    const article = ((fandom.article != fandom.title && fandom.article)? `**- ${fandom.article}**\n` : '')
    
    embed
        .setDescription(
        `\u200B${fandom.description}`
        )
        .addFields(
            { name: `${fun.parseNumber(fandom.value)} 📄 ${fun.parsePower(fandom)}`, 
            value: article + `${await fun.parseDate( message, fandom.released)}`
        })
        .setFooter({ text: 
            `${emojies.free} ${fandom.fdName} ${emojies.free}`
        })

    return
}