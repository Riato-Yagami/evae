module.exports = async _ => {
    const pokeQuery = await fun.queryRandomPoke(bot)
    return pokeQuery
}