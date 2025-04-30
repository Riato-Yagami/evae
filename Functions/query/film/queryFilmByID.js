const key = require(__basedir + "/botSettings/apiKey").tmdb

module.exports = async (ID) => {
    const query = `https://api.themoviedb.org/3/movie/${ID}?api_key=${key}`
    
    const body = await fun.queryAPI(query)
    if(!body) return false

    return body
}