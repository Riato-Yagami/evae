const keys = Object.values(require(__basedir + "/botSettings/apiKey").google)

var currentkeyID = 0

module.exports = (incr) => {
    if(incr){
        currentkeyID++
        if(currentkeyID > keys.length) currentkeyID = 0
        console.log(`switching to google key ${currentkeyID}`)
    }

    return keys[currentkeyID]
}