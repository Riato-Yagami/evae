// const ytdl = require("discord-ytdl-core");
const play = require('play-dl')

const { createAudioPlayer, createAudioResource , StreamType, demuxProbe, joinVoiceChannel, NoSubscriberBehavior, AudioPlayerStatus, VoiceConnectionStatus, getVoiceConnection } = require('@discordjs/voice')
module.exports = async (message,url) => {

    // console.log(url)
    let stream

    try {
        stream = await play.stream(url)
    } catch (error) {
        console.log('Error: This is not a YouTube Watch URL')
        return
    }
    
    const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    })

    let resource = createAudioResource(stream.stream, {
        inputType: stream.type
    })

    let player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Play
        }
    })
    
    player.play(resource)

    connection.subscribe(player)

    return true
}