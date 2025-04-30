module.exports = async (message,embed,music) => {
    var links = ''
    if(music.youtube != '') links += `[🟥](${music.youtube}) `
    if(music.spotify != '') links += `[🟢](${music.spotify}) `
    if(music.soundcloud != '') links += `[☁️](${music.soundcloud})`
    if(links != '') links = `🔗 \u200B \u200B ▶️ \u200B \u200B ${links} \n`

    embed
        .setDescription(music.artist)
        .setFooter({ text: `${emojies.free} ${music.album} ${emojies.free}`})
        .addFields(
            { name: `${fun.parseNumber(music.value)} 👁️`
            // +` ${fun.parseNumber(music.likes)} 👍`
            // +` ${fun.parseNumber(music.comments)} 💬` 
            +` ${fun.parsePower(music)}`, 
            value: `${links} ${await fun.parseDate( message, music.released)}` },
        );

    return
}