module.exports = async (search, setname) => {
    const pokeQuery = await fun.querySearchPoke(search, setname)
    // console.log(pokeQuery.length)
    
    if(pokeQuery == null) return null

    var pokes = []

    for await (const poke of pokeQuery) {
        pokes.push(await fun.parsePokeQuery(poke,true))
    };

    // console.log(pokes)
    // const poke = await fun.parsePokeQuery(pokeQuery[0],bot)

    return pokes
}