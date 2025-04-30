const { EmbedBuilder } = require('discord.js');

const action = require(__basedir + "/botSettings/action")
const aEmo = action.emoji
const aCol = action.color

module.exports = ( assets, str, confirmed = false, power = false) => {
    
    const ownedStr = buildString( assets.owned, power)
    const notOwnedStr = buildString( assets.notOwned, power)
    const notFoundStr = buildString( assets.notFound)

    var ownedEmbed
    var notOwnedEmbed
    var notFoundEmbed

    // console.log(ownedStr == '')
    if(ownedStr != '') ownedEmbed = new EmbedBuilder()
        .setTitle(`${confirmed? '' : 'you\'re about to'} ${str}`)
        .setDescription(ownedStr.substring(0,ownedStr.length - 8))
        .setColor(aCol.challenge)
    
    // console.log(notOwnedStr == '')
    if(notOwnedStr != '' && !confirmed) notOwnedEmbed = new EmbedBuilder()
        .setTitle('you do not own')
        .setDescription(notOwnedStr.substring(0,notOwnedStr.length - 8))

    // console.log(notFoundStr == '')
    if(notFoundStr != '' && !confirmed) notFoundEmbed =  new EmbedBuilder()
        .setTitle('we did not find')
        .setDescription(notFoundStr.substring(0,notFoundStr.length - 8))

    var replyEmbeds = []
    if(ownedEmbed) replyEmbeds.push(ownedEmbed)
    if(notOwnedEmbed) replyEmbeds.push(notOwnedEmbed)
    if(notFoundEmbed) replyEmbeds.push(notFoundEmbed)

    return replyEmbeds
}

function buildString( assets, power) {
    str = ''
    assets.forEach(asset => {
        var title
        if(typeof asset === "string"){
            title = assets
        }else{
            title = fun.parseTitle(asset)
        }
        str += `${title} ${power? `${fun.parsePower(asset)}` : ''} ***&*** `
    });
    return str
}