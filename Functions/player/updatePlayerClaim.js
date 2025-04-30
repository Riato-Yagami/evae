module.exports = async (claimInfo) => {
    const dbUpdateClaims = `UPDATE player
    SET lastClaim = current_timestamp(), claims = ${claimInfo.claims}, bonusClaim = ${claimInfo.bonusClaim}
    WHERE playerID = ${claimInfo.playerID}`


    fun.queryDb(dbUpdateClaims)
}