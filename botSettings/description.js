const prx = table.prefix
const emo = table.emoji
const spe = table.special

// console.log(spe)
module.exports = {
description :
    `${emo.fandom} > ${prx.fandom}` 
    +` ; ${emo.film} > ${prx.film}` 
    +` ; ${emo.game} > ${prx.game}` 
    +` ; ${emo.music} > ${prx.music}`
    +` ; ${emo.poke} > ${prx.poke}`
    +` ; ${emo.wiki} > ${prx.wiki}`,
    
ldscr :
    `You can add a tag or an emoji to get a specific category :\n` +
    `fandom : ${emo.fandom} or **${prx.fandom}**\n` 
    +`movies : ${emo.film} or **${prx.film}**\n` 
    +`games : ${emo.game} or **${prx.game}**\n` 
    +`songs : ${emo.music} or **${prx.music}**\n`
    +`pokémon tcg : ${emo.poke} or **${prx.poke}**\n`
    +`wikipedia : ${emo.wiki} or **${prx.wiki}**`,

separator :
    `separator **${spe.separator}**` 
    +` ; option **${spe.option}**`,
}