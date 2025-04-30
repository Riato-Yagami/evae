module.exports = (userID) => {
    const dbUpdateVotes = `UPDATE user
    SET lastvote = current_timestamp(), 
    votestack = votestack + 1, 
    votes = votes + 1,
    voteNotified = false
    WHERE user = '${userID}'`

    fun.queryDb(dbUpdateVotes)
}