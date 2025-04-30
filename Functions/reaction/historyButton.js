const listLength = 10

module.exports = async (message,asset,replyEmbed) => {
    const history = await fun.getHistory( message.guild, asset)

    if(history.length == 0) return
    
    const subArrs = fun.subArray(history,listLength)
        
    var embeds = []

    for await (const subArr of subArrs) {
        embeds.push(await fun.historyEmbed( message, subArr, asset))
    }

    var collected = await fun.confirmButton( message, false, '📄','history')

    if(collected){
        fun.displayPages(message,embeds,'event',history.length);
    }

    return
}