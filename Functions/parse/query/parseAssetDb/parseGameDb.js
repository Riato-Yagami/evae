module.exports = gameDb => {
    var game = {}

    game.id = gameDb.id

    game.title = fun.decode(gameDb.title)

    game.link = fun.decode(gameDb.link)

    game.value = gameDb.value

    game.power = gameDb.power

    game.illustration = fun.decode(gameDb.illustration)

    game.color =  stringToColor(gameDb.color)

    game.genres = fun.decode(gameDb.genres)

    game.platforms = fun.decode(gameDb.platforms)

    game.released = gameDb.released || ''

    game.description = fun.decode(gameDb.description)

    game.otitle = fun.decode(gameDb.otitle)

    game.score = fun.decode(gameDb.score)

    game.nsfw = gameDb.nsfw == 1

    return game
}

function stringToColor(str) {
    const values = str.split(',').map(Number);
    return [values[0], values[1], values[2]]
}