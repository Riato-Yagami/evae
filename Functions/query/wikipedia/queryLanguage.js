queryOptions = { 'User-Agent': 'evae (https://colordle.net/; jules.pesin@gmail.com) wiki.js' }


module.exports = async (QID) => {
    query = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&ids=${QID}`
    
    const body = await fun.queryAPI(query, queryOptions)
    if(!body) return
    if(!body.entities) return
    
    const Q1 = Object.values(body.entities)[0]
            
    const sitelinks = Object.values(Q1.sitelinks)
    var languages = []
    sitelinks.forEach(sitelink => {
        const lg = sitelink.site.split('wiki')[0]
        languages.push(lg)
    });

    return languages
}