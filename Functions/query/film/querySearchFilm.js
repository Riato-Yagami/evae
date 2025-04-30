const key = require(__basedir + "/botSettings/apiKey").tmdb

module.exports = async (search) => {
    const formatedSearch = encodeURIComponent(search)
    const query = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${formatedSearch}&per_page=1`
    // console.log(query)
    const body = await fun.queryAPI(query)
    if(!body) return

    const responses = body.results
    if(responses.length == 0) return
    const response = Object.values(responses)[0]
    return response.id
}