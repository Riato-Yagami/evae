module.exports = filmDb => {
    var film = {}

    film.id = filmDb.id

    film.title = fun.decode(filmDb.title)

    film.link = fun.decode(filmDb.link)

    film.value = filmDb.value

    film.power = filmDb.power

    film.illustration = fun.decode(filmDb.illustration)

    film.color =  stringToColor(filmDb.color)

    film.genres = fun.decode(filmDb.genres)

    film.released = filmDb.released || ''

    film.countries = fun.decode(filmDb.countries)

    film.description = fun.decode(filmDb.description)

    film.otitle = fun.decode(filmDb.otitle)

    film.nsfw  = filmDb.nsfw == 1

    // console.log(film)

    return film
}

function stringToColor(str) {
    const values = str.split(',').map(Number);
    // return new color(values[0], values[1], values[2]).rgb().array();
    return [values[0], values[1], values[2]]
}