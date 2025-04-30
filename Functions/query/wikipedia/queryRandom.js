queryOptions = { 'User-Agent': 'evae (https://colordle.net/; jules.pesin@gmail.com) wiki.js' }


module.exports = async (lg) => {

    const query = `https://${lg}.wikipedia.org/api/rest_v1/page/random/summary`
    
    const body = await fun.queryAPI(query, queryOptions)
    if(!body) return

    return body
}