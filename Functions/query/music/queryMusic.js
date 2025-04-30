const key = require(__basedir + "/botSettings/apiKey").genius

module.exports = async (apiPath) => {
    const query = `https://api.genius.com${apiPath}?access_token=${key}`
    
    const body = await fun.queryAPI(query,null,'fetch')
    if(!body) return

    if(body.meta.status == 404){
        // console.log(`no genius page with path : ${apiPath}`); 
        return;
    }

    const response = body.response
    return Object.values(response)[0]
}