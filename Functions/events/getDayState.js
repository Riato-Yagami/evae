const seedrandom = require('seedrandom');

// STATES
// war > challenge and attack
// tense > challenge
// neutral > challenge and trade
// peace > trade and gift

module.exports = async (message,date) => {
    if(!date) date = new Date()
    const formatedDate = await fun.parseDate(message,date, false, 'en')
    // console.log(formatedDate)
    const rng = Math.floor(100*seedrandom(formatedDate)())
        // date.toISOString())())
    var event = 'peace'
    switch (true) {
        case rng >= 83:
            event = 'war'
            break;
        case rng >= 37:
            event = 'tense'
            break;
        case rng >= 12:
            event = 'neutral'
            break;
    }
    // console.log(event)
    return event
}