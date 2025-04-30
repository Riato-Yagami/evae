module.exports = async (interation) => {
    let rollCost = 1

    if((rollCost > interation.player.rolls) && interation.user.id != 'oDEFAULT'){
        return {
            res : 'not enough rolls', 
            success : false, 
            rolls : interation.player.rolls,
            claims : interation.player.claims
        }
    }
    const asset = await fun.roll(interation)

    interation.player.rolls -= rollCost

    fun.updatePlayerRoll(interation.player)
    let owner = await fun.owner(asset, interation)
    fun.addRollHistory(asset,interation.guild,interation.user)

    return {
        res : 'roll success',
        success : true,
        owned : owner && owner.includes(interation.user.id),
        asset, 
        rolls : interation.player.rolls,
        claims : interation.player.claims
    }
}