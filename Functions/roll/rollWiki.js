module.exports = async (message,lg = 'en') => {
    
    if(message){
        lg = message.guild.language
    }

    const articleQuery = await fun.queryRandom(lg)

    if(!articleQuery){
        return `Roll failed 🚫 it's possible that Wikipedia do not support **${lg}**`
    }

    return articleQuery
}