const key = require(__basedir + "/botSettings/apiKey").rawg

module.exports = async (ID) => {
    const query = `https://api.rawg.io/api/games/${ID}?key=${key}`

    const body = await fun.queryAPI(query)
    if(!body) return

    return body
}