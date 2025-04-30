const { AutoPoster } = require('topgg-autoposter')

const key = require(__basedir + "/botSettings/apiKey").topgg;

module.exports = _ => {
    const poster = AutoPoster(key, bot)

    poster.on('posted', (stats) => { // ran when succesfully posted
        // console.log(stats)
        // console.log(`Posted stats to Top.gg | ${stats.serverCount} servers`)
    })

    poster.on('error', (err) => { 
        // console.log(err) 
    })
}
