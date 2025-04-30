queryOptions = { 'User-Agent': 'evae (https://colordle.net/; jules.pesin@gmail.com) wiki.js' }

module.exports = async (QID,lg) => {
    query = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&ids=${QID}&sitefilter=${lg}wiki`
    
    const body = await fun.queryAPI(query, queryOptions)
    if(!body) return

    const Q1 = Object.values(body.entities)[0]
    const sitelink = Object.values(Q1.sitelinks)[0]
    if(sitelink == null){return}
    return sitelink.title
}