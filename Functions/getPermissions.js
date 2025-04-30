module.exports = (message,user = false) => {
    if(user){
        return message.member.permissions.serialize()
    }
    return message.guild.members.cache.get(bot.user.id).permissions.serialize()
}