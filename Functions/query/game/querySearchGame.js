const key = require(__basedir + "/botSettings/apiKey").rawg

module.exports = async (search) => {
    const formatedSearch = encodeURIComponent(search)
    const query = `https://api.rawg.io/api/games?key=${key}&search=${formatedSearch}&page_size=1`
     
    const body = await fun.queryAPI(query)
    if(!body) return

    const responses = body.results
    if(responses.length == 0) return null
    const response = Object.values(responses)[0]
    return response.id
}