module.exports = async (message,embed,game) => {
    embed
        .setDescription(`\u200B${game.description}`)
        .addFields(
            { name: `${fun.parseNumber(game.value)} ✍️ ${fun.parseNumber(game.score)} ⭐ ${fun.parsePower(game)}`, 
            value: `${game.platforms} \n ${await fun.parseDate( message, game.released)}` },
        )
        .setFooter({ text: `${emojies.free} ${game.genres} ${emojies.free}`})

    return
}