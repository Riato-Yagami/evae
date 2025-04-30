module.exports = (dAsset,aAsset) => {
    const mult = (dAsset.power + dAsset.powerUp) * config.powerMult

    var div = 0
    if(aAsset){
        div = Math.ceil((aAsset.power + aAsset.powerUp) / config.powerDiv)
    }

    const dPower = Math.max(mult,div)
    return dPower
};