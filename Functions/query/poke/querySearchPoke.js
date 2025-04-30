const key = require(__basedir + "/botSettings/apiKey").tmdb

const queryOptions = {headers: { 'Authorization': `Bearer ${key}`}, json: true};

module.exports = async (search,setname) => {
    const formatedSearch = encodeURIComponent(search)
    var query = `https://api.pokemontcg.io/v2/cards?q=name:"${formatedSearch}"`
    
    if(setname){
        query += ` set.name:"${encodeURIComponent(setname)}"`
    }
    return await getPage(1,query)
}

async function getPage(page, query){
    const queryPage = `${query}&page=${page}`
    // console.log(queryPage)
    const body = await fun.queryAPI(queryPage,queryOptions)
    if(!body) return

    if(body.totalCount > body.pageSize * page){
        const data = Object.values(body.data)
        // console.log(`data.length = ${data.length}`)
        const next = await getPage(page+1,query)
        // console.log(`next.length = ${next.length}`)
        const res = data.concat(next)
        // console.log(`res.length = ${res.length}`)
        return res
    }

    return Object.values(body.data)
}