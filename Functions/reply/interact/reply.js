module.exports = async (message,args) => {
    let guildID

    if(message.guild){
        guildID = message.guild.id
    }else{
        guildID = message.guildId
    }

    if(!message || !fun.onlineServers().includes(guildID)){
        return
    }

    var reply
    if(message.deferred){
        reply = await message.editReply(args);
    }else{
        reply = await message.reply(args);
    }

    
    return reply;
}