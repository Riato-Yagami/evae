module.exports = async (search) => {
    const filmID = await fun.querySearchFilm(search)
    // console.log(filmID)
    if(filmID == null) return null

    const filmQuery = await fun.queryFilm(filmID)

    return filmQuery
}