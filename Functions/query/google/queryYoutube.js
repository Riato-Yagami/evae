module.exports = async (music) => {
    const title = music.title
    const author = music.artist
    const search = encodeURIComponent(`${title} ${author}`)
    const part = 'id' // id or snippet
    const query = `https://www.googleapis.com/youtube/v3/search?part=${part}&maxResults=1&q=${search}&type=video`

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
    const id = music.id.videoId
    return id

}