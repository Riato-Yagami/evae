const aEmo = require(__basedir + "/botSettings/action").emoji
const dEmo = require(__basedir + "/botSettings/day").emoji

module.exports = {
    name : "calendar",
    sort : 8,
    description : "Time periods calendar",
    ldscr : `Display this upcomming days calendar.`
    + `\n\nThere are 4 time periods:\n`
    + `-peace ${dEmo.peace} where you can give ${aEmo.gift} & trade ${aEmo.trade} assets\n`
    + `-neutral times ${dEmo.neutral} where you can ${aEmo.trade} & challenge ${aEmo.challenge}\n`
    + `-tense times ${dEmo.tense} where you can ${aEmo.challenge}\n`
    + `-wars ${dEmo.war} where you can  ${aEmo.challenge} & attack ${aEmo.attack}\n`
    + `\nTo ${aEmo.attack} you must search an asset which belongs to another player.`
    + `\nThe asset you attack will get a power ${emojies.power} bonus.`
    + `\nIf you win, you will capture it.`
    + `\nIf you lose, you will lose the asset you attacked with.`
,
    permission : "Aucune",
    dm: false,

    async run(message){
        
        fun.calendarEmbed(message)
    }
}