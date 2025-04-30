const key = require(__basedir + "/botSettings/apiKey").rawg

const pageSize = 1
const maxID = 30000
const maxReload = 100

module.exports = async (bot) => {
    return(tryID(randomId()))
}

function randomId()
{
    // const max = getGameCount()
    // const max = 842453/pageSize
    const max = maxID / pageSize
    return Math.floor(Math.random() * Math.floor(max));
}

// async function getGameCount(){
//     const query = `https://api.rawg.io/api/games?key=${key}`
//     return new Promise(function(resolve,reject){
//         request(query, queryOptions, (err, res, body) => {
//         if (err) { consol.log(err); resolve(842453) };
//         // console.log(body)
//         if (!err && res.statusCode == 200) {
//             resolve(body.count)
//     }});})
// }

async function tryID(ID){
    const query = `https://api.rawg.io/api/games?page=${ID}&page_size=${pageSize}&key=${key}`
    
    const body = await fun.queryAPI(query)
    if(!body) return

    game = Object.values(body.results)[0]
    return game.id
}