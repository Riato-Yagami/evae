module.exports = async (message,assets,user,sort,page,image,text = true) => {

    if(assets.length == 0) {
        var noAssets
        if(user){
            noAssets = '**'
            + (message.user && (message.user.id == user.id)? 'You' : user.username) 
            + `** have no asset`
        }else{
            noAssets = 'Nothing appended at this date'
        }
        fun.reply(message, noAssets)
        
        // fun.reply(message, noAssets)
        return
    }
    
    fun.sortAssets(assets,sort)
    
    switch (image) {
        case 0:
            fun.listEmbedReply(assets, message, bot, user, page, sort)
            break;
        case 1:
            if(!text){
                fun.imageEmbedReply(message, assets, user, page, sort, image, text)
            }else{
                fun.multipleEmbedReply(assets, message, bot, user, page)
            }
            break;
        default:
            fun.imageEmbedReply(message, assets, user, page, sort, image, text)
            break;
    }
}