const queryOptions = require(__basedir + "/.env/queryOptions.js").poke;

var cardCount = 15851
module.exports = async bot => {
    page = await getRandomPage()
    const query = `https://api.pokemontcg.io/v2/cards?pageSize=1&page=${page}`

    // console.log("PokeTCG random query:", query);
    
    const body = await fun.queryAPI(query,queryOptions)
    if(!body) return
    
    cardCount = body.totalCount

    
    return Object.values(body.data)[0]
    
}
async function getRandomPage(){
    const min = Math.ceil(0);
    const max = Math.floor(cardCount+1);
    return Math.floor(Math.random() * (max - min) + min);
}