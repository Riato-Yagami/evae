module.exports = async (asset, message, replyEmbed) => {
    claimReaction(asset, message, replyEmbed)
}

async function claimReaction(asset, message, replyEmbed){
    var react = await fun.confirmButton(message,null,emojies.claim,'claim')

    if(!react) return

    let player = react.player
    if(player.claims + player.bonusClaim > 0){

        const claimed = await fun.claim(message,react.user,asset,'claim')
        
        if(claimed){
            fun.ownedEmbed(message,replyEmbed,react.user)
            player.claims-=1
            if(player.claims < 0){
                player.bonusClaim += player.claims
                player.claims = 0
            }
            fun.updatePlayerClaim(player)
        }
        else{
            claimReaction(asset, message, replyEmbed)
        }
    }
    else{
        var playerText = `**${react.user.username}** you have `
        +`**${player.claims}** claim${(player.claims > 1)? 's' : ''} left`
        const timeLeft = fun.getTimeUntilReset()
        playerText += `\nnext reset in : **${timeLeft}**`
        fun.followUp(message,playerText)
        claimReaction(asset, message, replyEmbed)
    }
}