const key = require(__basedir + "/botSettings/apiKey").genius
const maxID = 2471960

module.exports = async bot => {
    const ID = randomId()
    // const ID = 	5969224

    return tryID(ID)
}

function randomId()
{
    return Math.floor(Math.random() * Math.floor(maxID));
}

async function tryID(ID){
    const query = `https://api.genius.com/songs/${ID}?access_token=${key}`
    
    const body = await fun.queryAPI(query,null,'fetch')
    if(!body) return

    if(body.meta.status == 404){
        // console.log(`no music with ID : ${ID}`)
        return tryID(randomId())
    }

    const music = body.response.song

    if(!music) return
    
    const imageUrl = music.song_art_image_url || ''
    if(imageUrl.includes('default_cover_image.png') || imageUrl == ''){
        return tryID(randomId())
    }

    return music
}