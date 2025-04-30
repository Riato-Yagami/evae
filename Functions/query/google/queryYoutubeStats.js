module.exports = async (id) => {
    const part = 'statistics' // id or snippet
    const query = `https://youtube.googleapis.com/youtube/v3/videos?part=${part}&id=${id}`

    return await tryKey(query)
}

async function tryKey(query,tryCount){
    const queryWithKey = `${query}&key=${fun.getGoogleKey()}`

    const body = await fun.queryAPI(queryWithKey)
    if(!body) return

    if(body.error){
        if(tryCount > 1){
            console.log(body.error.message) ; return 1
        }
        fun.getGoogleKey(true)
        return tryKey(query,tryCount++)
    }

    if(body.items == null) return 
    if(body.items.length == 0) return

    const music = Object.values(body.items)[0]
    const stats = music.statistics
    return stats

}