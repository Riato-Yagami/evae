module.exports = wikiDb => {
    var wiki = {}

    wiki.id = wikiDb.id

    wiki.title = fun.decode(wikiDb.title)

    wiki.link = fun.decode(wikiDb.link)

    wiki.value = wikiDb.value

    wiki.power = wikiDb.power

    wiki.illustration = fun.decode(wikiDb.illustration)

    wiki.color =  stringToColor(wikiDb.color)

    wiki.released = wikiDb.released || ''

    wiki.category = fun.decode(wikiDb.category)

    wiki.description = fun.decode(wikiDb.description)

    return wiki
}

function stringToColor(str) {
    const values = str.split(',').map(Number);
    // return new color(values[0], values[1], values[2]).rgb().array();
    return [values[0], values[1], values[2]]
}