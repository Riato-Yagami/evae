module.exports = musicDb => {
    var music = {}

    music.id = musicDb.id

    music.title = fun.decode(musicDb.title)

    music.link = fun.decode(musicDb.link)

    music.value = musicDb.value

    music.power = musicDb.power

    music.illustration = fun.decode(musicDb.illustration)

    music.color =  stringToColor(musicDb.color)

    music.released = musicDb.released || ''

    music.album = fun.decode(musicDb.album)

    music.artist = fun.decode(musicDb.artist)

    music.youtube = fun.decode(musicDb.youtube)
    music.soundcloud = fun.decode(musicDb.soundcloud)
    music.spotify = fun.decode(musicDb.spotify)

    music.likes = musicDb.likes
    music.comments = musicDb.comments

    // console.log(music)

    return music
}

function stringToColor(str) {
    const values = str.split(',').map(Number);
    // return new color(values[0], values[1], values[2]).rgb().array();
    return [values[0], values[1], values[2]]
}