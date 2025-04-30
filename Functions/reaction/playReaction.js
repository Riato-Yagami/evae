const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
// const { QueryType } = require("discord-player")

module.exports = async (music, message, replyEmbed, reply, bot) => {
    
    var react = await fun.confirmButton(message,null,emojies.play,'play',emojies.playing)
    if(!react) return

    var youtubeQueryLink = false
    if(music.youtube == ''){
        music.youtube = await fun.queryYoutube(music)
        youtubeQueryLink = true
    }
    if(music.youtube == ''){ fun.followUp(message,`no youtube page found`); return}
    await playMusic(music, message, reply, react.user, youtubeQueryLink)
    
    // button.setEmoji('🎵')
}

async function playMusic(music, message, reply, reactingUser, youtubeQueryLink){
    // console.log(music.youtube)
    const permissions = fun.getPermissions(message)
    if(!permissions.Connect){
        fun.followUp(message,`${bot.user} doens't have permission to **connect** to voice channel`)
        return
    }

    if(!permissions.Speak){
        fun.followUp(message,`${bot.user} doens't have permission to **speak**`)
        return
    }
    
    let channel = message.member.voice.channel
    if (channel) {

        ytPlayer = await fun.youtubePlayer(message,music.youtube)

        if(!ytPlayer){
            fun.followUp(message,`${emojies.error} Failed to play music ${emojies.error}`)
        }

    }else{
        fun.followUp(message,`You need to be in voice`)
    }
}