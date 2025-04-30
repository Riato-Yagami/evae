const bonusClaim = 1
const bonusVote = 9

module.exports = async (player) => {
    const userID = player.user
    const getVoteStack = `SELECT votestack, votes
    FROM user
    WHERE user = '${userID}'`

    const queryRes = await fun.queryDb(getVoteStack)
    // console.log(queryRes)
    if(!queryRes) return null

    var voteInfo = queryRes[0]

    if(voteInfo.votestack == 0) return false

    const votes = voteInfo.votes

    for (let i = 0; i < voteInfo.votestack; i++) {
        if((votes + i)%2 == 0 ){
            player.bonusClaim += bonusClaim
        }else{
            player.bonusRoll += bonusVote
        }
    }
    
    const updateVoteStack = `UPDATE user
        SET votestack = 0
        WHERE user = '${userID}'`
        
    fun.queryDb(updateVoteStack)

    return true
}