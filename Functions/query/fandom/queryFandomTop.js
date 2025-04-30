const count = 5 // max 500
const abstarctLength = 500 // max 500

module.exports = async (fandomName) => {
    const query = `https://${fandomName}.fandom.com/api/v1/Articles/Top?limit=${count}&expand=1&abstract=${abstarctLength}`
    
    const body = await fun.queryAPI(query)
    if(!body) return
    // console.log(body)

    var fandomQuerys = []
    const items = Object.values(body.items)
    for (let i = 0; i < items.length; i++) {
        const fandomQuery = Object.values(body.items)[i];
        fandomQuery.basepath = body.basepath
        fandomQuery.fdTag = fandomName
        fandomQuerys.push(fandomQuery)
    }
            
    return fandomQuerys
}