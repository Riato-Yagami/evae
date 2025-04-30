module.exports = async (user) => {
    const userID = user
    const getVoteStack = `SELECT *
    FROM user
    WHERE user = '${userID}'`

    const queryRes = await fun.queryDb(getVoteStack)
    if(!queryRes) return null

    var info = queryRes[0]

    var voteInfo = {
        lastVote : info.lastvote? new Date(info.lastvote) : null
    }

    return voteInfo
}