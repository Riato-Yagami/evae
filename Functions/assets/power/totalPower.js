module.exports = assets => {
    var power = 0
    assets.forEach(asset => {
        power += asset.power + asset.powerUp
    });

    return power
}