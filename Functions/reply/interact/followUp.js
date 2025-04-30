module.exports = async (message,args) => {
    let guildID

    if(message.guild){
        guildID = message.guild.id
    }else{
        guildID = message.guildId
    }

    if(!fun.onlineServers().includes(guildID)){
        // console.log("server is disconnected")
        return
    }

    const reply = await message.followUp(args);
    return reply;
}