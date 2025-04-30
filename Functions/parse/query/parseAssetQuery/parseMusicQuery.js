const prx = table.prefix
const idRegex = /v=([^\&\?\/]{11})/

module.exports = async (musicQuery) => {
    // console.log(musicQuery)
    var music = {}

    music.id = prx.music + musicQuery.id

    music.title = musicQuery.title

    // music.value = Number(musicQuery.pyongs_count) || 0

    music.link = musicQuery.url

    music.illustration = musicQuery.song_art_image_url || ''

    if(music.illustration.includes('i.genius.com') || music.illustration == ''){
        music.illustration = ''
        if(musicQuery.album) music.illustration = musicQuery.album.cover_art_url || ''
    }
    // console.log(music.illustration)

    music.color = await fun.getDominantColor(music.illustration)

    if(musicQuery.release_date){music.released = new Date(musicQuery.release_date)
    }else{music.released = ''}

    // console.log(music.released)

    if(musicQuery.album){
        music.album = musicQuery.album.name.replace(/^./, firstLetter => firstLetter.toUpperCase())
    }
    else music.album = "Single"

    music.artist = musicQuery.artist_names

    music.youtube = ''
    music.spotify = ''
    music.soundcloud = ''
    musicQuery.media.forEach(media => {
        const provider = media.provider
        const url = media.url
        switch (provider) {
            case 'youtube': music.youtube = url ; break;
            case 'spotify': music.spotify = url ; break;
            case 'soundcloud': music.soundcloud = url ; break;
        }
    })

    var id
    var stats
    if(!music.youtube){
        id = await fun.queryYoutube(music)
        music.youtube = `https://www.youtube.com/watch?v=${id}`
        stats = await fun.queryYoutubeStats(id)
    }else{
        // console.log('already have yt')
        id = music.youtube.match(idRegex);
        stats = await fun.queryYoutubeStats(id)

        if(!stats){
            console.log('old link dead')
            id = await fun.queryYoutube(music)
            music.youtube = `https://www.youtube.com/watch?v=${id}`
            stats = await fun.queryYoutubeStats(id)
        }
    }
    
    if(!stats){
        music.value = 0
        music.likes = 0
        music.comments = 0
    }else{
        music.value = Number(stats.viewCount || 0)
        music.likes = Number(stats.likeCount || 0)
        music.comments = Number(stats.commentCount || 0)
    }
    
    music.power = fun.rescalePower(music.value, 1000000000, 0.5)

    return music
}