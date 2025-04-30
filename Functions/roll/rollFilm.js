module.exports = async _ => {

    const filmQuery = await fun.queryRandomFilm(bot)

    return filmQuery
}