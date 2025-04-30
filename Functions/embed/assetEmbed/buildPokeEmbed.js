module.exports = async (message,embed,poke) => {
    var prices = ''
    if(poke.value != 0 ) prices = `${fun.parseNumber(poke.value)}$ 💰 ` 
    if(poke.valueh) prices += `${fun.parseNumber(poke.valueh)}$ ⭐`

    embed
        .setDescription(`**${prices} ${fun.parsePower(poke)}**
        ${await fun.parseDate( message, poke.released)}`)
        .setFooter({ text: `${emojies.free} ${poke.artist} ${emojies.free}`})

    return
}