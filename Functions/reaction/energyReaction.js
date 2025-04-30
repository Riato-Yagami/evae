const probability = 10 // 1 chance out of probability
const powerPart = 1/15

module.exports = async (asset, message) => {
    rand = fun.randomInt(0,probability)
    if(rand != 0) return

    var react = await fun.confirmButton(message,null,emojies.power,'energy')
    if(!react) return

    const power = powerPart * asset.power

    const query = `UPDATE player
    SET powerBank = powerBank + ${power}
    WHERE user = '${react.user.id}'
    AND guild = '${react.guild.id}'
    `

    fun.queryDb(query)
}