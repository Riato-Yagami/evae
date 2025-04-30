const assets = require("./assets")

const srt = table.sort

module.exports = async (interation) => {

    const lastRolls = await fun.getLastRolls(interation.player.playerID, 1)
    if(lastRolls.length == 0){
        return {
            res : 'no roll yet',
            success : false,
        }
    }

    let asset = await fun.queryAssetById(lastRolls[0])
    let owner = await fun.owner(asset, interation)

    return {
        res : 'last roll recovered',
        success : true,
        owned : owner && owner.includes(interation.user.id),
        asset
    }
}