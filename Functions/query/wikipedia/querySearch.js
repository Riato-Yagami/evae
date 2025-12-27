const queryOptions = require(__basedir + "/.env/queryOptions.js").wiki;

module.exports = async (search,lg) => {

    const formatedSearch = encodeURIComponent(search)
    const query = `https://${lg}.wikipedia.org/w/api.php?action=opensearch&format=json&search=${formatedSearch}&limit=10`
    
    const body = await fun.queryAPI(query, queryOptions)
    if(!body) return

    const results = Object.values(body)[1]

    try {firstResult = Object.values(results)[0]
    } catch(error){ return }

    return firstResult
}