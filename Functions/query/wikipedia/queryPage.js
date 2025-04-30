queryOptions = { 'User-Agent': 'evae (https://colordle.net/; jules.pesin@gmail.com) wiki.js' }


module.exports = async (articleName,lg) => {

    const formatedName = encodeURIComponent(articleName)
    // console.log(formatedName)
    const query = `https://${lg}.wikipedia.org/api/rest_v1/page/summary/${formatedName}`
    
    const body = await fun.queryAPI(query, queryOptions)
    if(!body) return

    if(body.type == 'https://mediawiki.org/wiki/HyperSwitch/errors/not_found#route') return
    return body
}