module.exports = fandomDb => {
    var fandom = {}

    fandom.id = fandomDb.id

    fandom.title = fun.decode(fandomDb.title)

    fandom.link = fun.decode(fandomDb.link)

    fandom.value = fandomDb.value

    fandom.power = fandomDb.power

    fandom.illustration = fun.decode(fandomDb.illustration)

    fandom.color =  stringToColor(fandomDb.color)

    fandom.fdTag = fun.decode(fandomDb.fdTag)

    fandom.released = fandomDb.released || ''

    fandom.fdName = fun.decode(fandomDb.fdName)

    fandom.description = fun.decode(fandomDb.description)

    fandom.article = fun.decode(fandomDb.article)

    // console.log(fandom)

    return fandom
}

function stringToColor(str) {
    const values = str.split(',').map(Number);
    // return new color(values[0], values[1], values[2]).rgb().array();
    return [values[0], values[1], values[2]]
}