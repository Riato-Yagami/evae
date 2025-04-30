module.exports = async (message,embed,film) => {
    embed
        .setDescription(`\u200B${film.description}`)
        .addFields(
            { name: `${fun.parseNumber(film.value)} 🍿 ${fun.parsePower(film)}`, 
            value: `\u200B${film.countries} \n ${await fun.parseDate( message, film.released)}` },
        )
        .setFooter({ text: `${emojies.free} ${film.genres} ${emojies.free}`})

    return
}