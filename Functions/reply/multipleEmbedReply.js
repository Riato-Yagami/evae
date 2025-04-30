module.exports = async (assets, message, bot, user, page = 0) => {
    
    var embeds = []

    for await (const asset of assets) {
        var embed = await fun.buildAssetEmbed(message,asset)
        var owner = user
        if(!owner) owner = await fun.owner(asset,message)
        footer = ' '
        const oldFooter = embed.data.footer

        if(oldFooter){
            if(oldFooter.text) footer = `${oldFooter.text} `
        }

        if(owner){
            await fun.ownedEmbed( message, embed, owner, true, asset)
        } 
        
        embeds.push(embed)
    }

    fun.displayPages(message,embeds,'asset',assets.length,page);

    return
}