const env = require(__basedir + "/.env/apiKeys.js")

module.exports = {
    tmdb: env.tmdb,
    rawg: env.rawg, 
    genius: env.genius,
    cardTrader: env.cardTrader,
    pTCG: env.pTCG,
    discogs : env.discogs,
    google: env.google,
    topgg: env.topgg
}