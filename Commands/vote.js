const { concurrency } = require("sharp");
const voteEmbed = require("../Functions/embed/voteEmbed");

module.exports = {
    name : "vote",
    sort : 13,
    description : "Vote on Top.gg",
    ldscr: "Vote for Evaé on Top.gg and earn bonus claim as a reward",
    permission : "Aucune",
    dm: false,

    async run(message){

        var hasVoted = await fun.hasVoted(message.user.id)
        var voteInfo = await fun.voteInfo(message.user.id)

        // console.log(voteInfo)
        var timeInfo = {
            negative : false
        }

        if(voteInfo.lastVote
            && hasVoted
            ){
            voteInfo.lastVote.setTime(voteInfo.lastVote.getTime() 
            + (12 * 60 * 60 * 1000 - 50 * 1000)
            ); // Add 12 hours to the last vote time
            timeInfo = fun.getTimeDiff(new Date(), voteInfo.lastVote)
        }
        
        const embed = voteEmbed(hasVoted,timeInfo)

        fun.reply(message,{embeds :[embed]})
    }
}