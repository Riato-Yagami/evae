const claimCost = 1
module.exports = async (interation,query) => {
    if(claimCost > interation.player.claims){
        return {
            res : 'not enough claims', 
            success : false,
            claims : interation.player.claims
        }
    }

    const lastRolls = await fun.getLastRolls(interation.player.playerID, 1)
    // console.log(lastRolls)

    if(!lastRolls.includes(query.asset)){
        return {
            res : "asset doesn't correspond to last rolls",
            success : false,
            claims : interation.player.claims
        }
    }

    const claimed = await fun.claim(interation,interation.user,{id : query.asset},'claim')

    if(!claimed){
        return {
            res : 'claim failed - probably claimed already',
            success : false,
            claims : interation.player.claims
        }
    }
    interation.player.claims -= claimCost
    fun.updatePlayerClaim(interation.player)

    return {
        res : 'claim success',
        success : true,
        claims : interation.player.claims
    }
}