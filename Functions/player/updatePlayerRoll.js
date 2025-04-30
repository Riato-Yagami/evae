module.exports = async (rollInfo) => {
    const dbUpdateRolls = `UPDATE player
    SET lastRoll = current_timestamp(), 
    rolls = ${rollInfo.rolls}, 
    bonusRoll = ${rollInfo.bonusRoll},
    rollNotified = false
    WHERE playerID = ${rollInfo.playerID}`

    fun.queryDb(dbUpdateRolls)
}