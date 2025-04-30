module.exports = pokeDb => {
    var poke = {}

    poke.id = pokeDb.id

    poke.title = fun.decode(pokeDb.title)

    poke.link = fun.decode(pokeDb.link)

    poke.value = pokeDb.value

    poke.power = pokeDb.power

    poke.illustration = fun.decode(pokeDb.illustration)

    poke.color =  stringToColor(pokeDb.color)

    poke.released = pokeDb.released || ''

    poke.types = fun.decode(pokeDb.types)

    poke.artist = fun.decode(pokeDb.artist)

    poke.setname = fun.decode(pokeDb.setname)

    poke.rarity = fun.decode(pokeDb.rarity)

    poke.valueh = pokeDb.valueh

    poke.homonym = pokeDb.homonym

    // console.log(poke)

    return poke
}

function stringToColor(str) {
    const values = str.split(',').map(Number);
    // return new color(values[0], values[1], values[2]).rgb().array();
    return [values[0], values[1], values[2]]
}