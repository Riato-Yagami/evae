module.exports = async (message,embed,wiki) => {
    embed
        .setDescription(wiki.description)
        .addFields(
            // { name: `\u200B`, value: `\u200B` },
            { name: `${fun.parseNumber(wiki.value)} 🌍 ${fun.parsePower(wiki)}`, 
            value: await fun.parseDate( message, wiki.released) })
        .setFooter({ text: `${emojies.free} ${wiki.category} ${emojies.free}`})

    return embed
}