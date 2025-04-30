const prx = table.prefix
// console.log(prx)

module.exports = (asset) => {
    // console.log("try adding to db")
    // console.log(asset)
    // const acquisitionID = fun.createId("CLAIM")
    // const upDate = new Date().toISOString().replace('T', ' ').substr(0, 19)
    const prefix = asset.id.charAt(0)
    // console.log(prefix)
    
    var dbQuery = 'REPLACE INTO '
    const fields = '(id, title, value, power, link, illustration, color, released, '

    const title = fun.encode(asset.title)
    const value = asset.value
    const power = asset.power
    const link = fun.encode(asset.link)
    const illustration = fun.encode(asset.illustration)
    const color = asset.color
    const released = parseDate(asset.released)
    const nsfw = asset.nsfw? 'true' : 'false'

    const valueSTR = `VALUES ('${asset.id}','${title}', ${value}, ${power}, '${link}', '${illustration}', '${color}', ${released}, `
    // console.log(valueSTR)
    switch (prefix) {
        case prx.fandom:
            description = fun.encode(asset.description)
            fdTag = fun.encode(asset.fdTag)
            fdName = fun.encode(asset.fdName)
            article = fun.encode(asset.article)
            dbQuery += `fandom ${fields} description, fdTag, fdName, article)
            ${valueSTR}
            '${description}','${fdTag}','${fdName}', '${article}')`
            break;

        case prx.film:
            genres = fun.encode(asset.genres)
            countries = fun.encode(asset.countries)
            description = fun.encode(asset.description)
            otitle = fun.encode(asset.otitle)
            dbQuery += `film ${fields} nsfw, genres, countries, description, otitle)
            ${valueSTR}
            ${nsfw}, '${genres}', '${countries}','${description}','${otitle}')`
            break;

        case prx.game:
            genres = fun.encode(asset.genres)
            platforms = fun.encode(asset.platforms)
            description = fun.encode(asset.description)
            otitle = fun.encode(asset.otitle)
            score = fun.encode(asset.score)

            dbQuery += `game ${fields} nsfw, genres, platforms, description, otitle, score)
            ${valueSTR}
            ${nsfw}, '${genres}', '${platforms}','${description}','${otitle}','${score}')`
            break;

        case prx.music:
            album = fun.encode(asset.album)
            artist = fun.encode(asset.artist)
            youtube = asset.youtube
            spotify = asset.spotify
            soundcloud = asset.soundcloud
            likes = asset.likes
            comments = asset.comments
            dbQuery += `music ${fields} album, artist, youtube, spotify, soundcloud, likes, comments)
            ${valueSTR}
            '${album}', '${artist}', '${youtube}', '${spotify}', '${soundcloud}', ${likes}, ${comments})`
            break;

        case prx.poke:
            types = fun.encode(asset.types)
            artist = fun.encode(asset.artist)
            setname = fun.encode(asset.setname)
            rarity = fun.encode(asset.rarity)
            valueh = asset.valueh
            homonym = asset.homonym
            dbQuery += `poke ${fields} types, artist, setname, rarity, valueh, homonym)
            ${valueSTR}
            '${types}', '${artist}', '${setname}', '${rarity}', '${valueh}', '${homonym}')`
            break;
    
        case prx.wiki:
            category = fun.encode(asset.category)
            description = fun.encode(asset.description)
            dbQuery += `wiki ${fields} category, description)
            ${valueSTR}
            '${category}','${description}')`
            break;
    }
    // console.log(dbQuery)

    fun.queryDb(dbQuery)
}

function parseDate(date){
    // console.log(date)
    if(date == '') return null
    const year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month < 10) {
    month = `0${month}`;
    }

    if (day < 10) {
    day = `0${day}`;
    }

    return `${year}${month}${day}`;
}