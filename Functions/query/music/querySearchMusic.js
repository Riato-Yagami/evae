const key = require(__basedir + "/botSettings/apiKey").genius

module.exports = async (search) => {
    const formatedSearch = encodeURIComponent(search)
    const query = `https://api.genius.com/search?q=${formatedSearch}&per_page=1&access_token=${key}`
    
    const body = await fun.queryAPI(query,null,'fetch')
    if(!body) return

    const responses = body.response.hits
    if(responses.length == 0) return
    const response = Object.values(responses)[0]
    return response.result.api_path
}