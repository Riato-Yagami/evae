const config = require(__basedir + "/config")

const firstBonus = 3
const nextBonus = 2
const maxBonus = 10

const defaultClaim = config.beta? 100 : 1
const defaultRoll = config.beta? 1000 : 9

module.exports = async (player) => {
    
    await fun.useVote(player)

    const date = new Date()

    const lastClaim = new Date(player.lastClaim)
    const lastRoll = new Date(player.lastRoll)

    if(!sameHour(date, lastClaim)){
        player.claims = defaultClaim
    }

    if(!sameHour(date, lastRoll) || !player.lastRoll){
        player.rolls = defaultRoll

        if(player.lastClaim && !sameHour(lastClaim, lastRoll)){
            if(player.bonusRoll + nextBonus < firstBonus){
                player.bonusRoll = firstBonus
            }
            else if(player.bonusRoll < maxBonus){
                player.bonusRoll += nextBonus
            }
        }

        player.bonusRoll = Math.max(0,player.bonusRoll)
    }

    const dbUpdatePlayer = `UPDATE player
        SET claims = ${player.claims},
        rolls = ${player.rolls},
        bonusClaim = ${player.bonusClaim},
        bonusRoll = ${player.bonusRoll}
        WHERE playerID = ${player.playerID}`

    await fun.queryDb(dbUpdatePlayer)
    return player
}

// module.exports = async (interaction) => {
    
//     let player = await fun.getPlayer(interaction.guild,interaction.user)

//     await fun.useVote(interaction.user.id,player)

//     const date = new Date()

//     const lastClaim = new Date(player.lastClaim)
//     const lastRoll = new Date(player.lastRoll)

//     if(!sameHour(date, lastClaim)){
//         player.claims = defaultClaim
//     }

//     if(!sameHour(date, lastRoll) || !player.lastRoll){
//         player.rolls = defaultRoll

//         if(player.lastClaim && !sameHour(lastClaim, lastRoll)){
//             if(player.bonusRoll + nextBonus < firstBonus){
//                 player.bonusRoll = firstBonus
//             }
//             else if(player.bonusRoll < maxBonus){
//                 player.bonusRoll += nextBonus
//             }
//         }

//         player.bonusRoll = Math.max(0,player.bonusRoll)
//     }

//     const dbUpdatePlayer = `UPDATE player
//         SET claims = ${player.claims},
//         rolls = ${player.rolls},
//         bonusClaim = ${player.bonusClaim},
//         bonusRoll = ${player.bonusRoll}
//         WHERE playerID = ${player.playerID}`

//     await fun.queryDb(dbUpdatePlayer)
//     return player
// }

function sameDay(dateA,dateB){
    return dateA.getDate() == dateB.getDate() 
    && dateA.getMonth() == dateB.getMonth()
    && dateA.getFullYear() == dateB.getFullYear()
}

function sameHour(dateA,dateB){
    return sameDay(dateA, dateB) && dateA.getHours() == dateB.getHours()
}