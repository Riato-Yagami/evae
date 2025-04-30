const count = 1 // max 500
const abstarctLength = 500 // max 500

module.exports = async (search,fandomName) => {
    const formatedSearch = encodeURIComponent(search)
    const query = `https://${fandomName}.fandom.com/api/v1/Articles/List?offset=${formatedSearch}&limit=${count}&expand=1&abstract=${abstarctLength}`
    
    const body = await fun.queryAPI(query)
    if(!body) return

    var fandomQuery = Object.values(body.items)[0]
    fandomQuery.basepath = body.basepath
    fandomQuery.fdTag = fandomName
    return fandomQuery
}