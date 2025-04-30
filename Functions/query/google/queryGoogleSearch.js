const searchEngine = '21165c174dcc84587'

module.exports = async ( search, exactTerms) => {
    const formatedSearch = encodeURIComponent(search)
    var query = `https://customsearch.googleapis.com/customsearch/v1?cx=${searchEngine}&dateRestrict=m%5B1%5D&q=${formatedSearch}`
    if(exactTerms) query += `&exactTerms=${encodeURIComponent(exactTerms)}`
    return await tryKey(query)
    
}

async function tryKey(query,tryCount){
    const queryWithKey = `${query}&key=${fun.getGoogleKey()}`
    // console.log(queryWithKey)

    const body = await fun.queryAPI(queryWithKey)
    if(!body) return

    if(body.error){
        if(tryCount > 1){
            console.log(body.error.message) ; return 1
        }
        fun.getGoogleKey(true)
        return tryKey(query,tryCount++)
    }

    if(body.searchInformation == null) return
    const res = body.searchInformation.totalResults
    return res
}