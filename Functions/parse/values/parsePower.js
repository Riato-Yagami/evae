module.exports = asset => {
    let powerText = fun.parseNumber(asset.power)

    if(asset.powerUp > 0){
        powerText += ` + ${fun.parseNumber(asset.powerUp)}`
    }

    return `${powerText} ${emojies.power}`
}