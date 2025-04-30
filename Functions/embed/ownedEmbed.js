const aEmo = require(__basedir + "/botSettings/action").emoji

module.exports = async ( message, embed, user, footerIcon, asset) => {

    var footerData = embed.data.footer
    var footer = ""
    if(footerData != null){ footer = embed.data.footer.text
        footer = cutFooter(footer)
    }
    
    if(!asset) await footerAnimation(message,embed,footer,user)
    else{
        const history = await fun.getHistoryType(message.guild, asset)
        var emoji = aEmo[history]

        var footerText

        // console.log(user.externalGuild)
        if(user.externalGuild){
            footerText = ` ${emojies.externalUser} `
        }else{
            footerText = ` ${emojies.owned} `
        }

        footerText += `${footer} ${emoji}`

        if(footerIcon){
            let footer = { text: footerText, iconURL : user.displayAvatarURL()}
            embed.setFooter(footer)
            return
        }
        // console.log(footerText)
        embed.setFooter({ text: footerText })

        // if(!user.left) 
        embed.setThumbnail(user.displayAvatarURL())
    }
}

function cutFooter(footer){
    const char = emojies.free
    const startIndex = footer.indexOf(char) + 3;
    const endIndex = footer.lastIndexOf(char);
    
    return footer.substring(startIndex, endIndex);
}

async function footerAnimation(message,embed,footer, user){
    var replyData = { embeds: [embed], fetchReply: false}
    const sleepTime = 750
    const emo = emojies.owned

    embed.setFooter({ text: ` ${emo} ${footer} ${emo} `})
    fun.reply(message,replyData)
    await sleep(sleepTime);
    embed.setFooter({ text: ` ${emo} ${footer} ${emo} ${emo} `})
    fun.reply(message,replyData)
    await sleep(sleepTime);
    embed.setFooter({ text: ` ${emo} ${footer} ${emo} ${emo} ${emo}`})
    fun.reply(message,replyData)
    await sleep(sleepTime);
    embed.setFooter({ text: ` ${emo} ${footer} ${emo} ${emo} ${emo} ${emojies.yes}`})
    fun.reply(message,replyData)
    await sleep(sleepTime);
    // fun.reply(message,{ embeds: [embed], fetchReply: false})

    // console.log(user.displayAvatarURL())
    const dColor = await fun.getDominantColor(user.displayAvatarURL())
    // console.log(dColor)
    embed.setColor(dColor)
        .setThumbnail(user.displayAvatarURL())
        .setFooter({ text: ` ${emojies.yes} ${footer} ${emojies.yes} `})
    fun.reply(message,{ embeds: [embed], fetchReply: false})
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}