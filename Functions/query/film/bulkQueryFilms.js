const clc = require("cli-color");

module.exports = async (part = {start: 0, end: 10}) => {
    const IDs = await fun.queryFilmIDs()
    if(!IDs) return

    console.log(clc.bgMagenta('FILM COUNT') + ' : ' + clc.yellow(IDs.length))

    let IDsPart = IDs.slice(Math.max(0,part.start), Math.min(IDs.length,part.end));

    let films = []
    for await (const ID of IDsPart) {
        let filmQuery = await fun.queryFilmByID(ID)
        let film = await fun.parseAssetQuery(filmQuery,'m')
        films.push(film)
        await fun.addToDb(film)
        // console.log('Added : ' + clc.cyan(film.title))
        await fun.sleep(200)
    }

    // for await (const f of films) {
    //     await fun.addToDb(f)
    // }

    console.log(clc.bgMagenta('ADDED') + ' : ' + clc.yellow(films.length) + ' films')

    return films
}