const prx = table.prefix

module.exports = async (filmQuery) => {
    var film = {}

    film.id = prx.film + filmQuery.id

    film.title = filmQuery.title

    film.value = Number(filmQuery.popularity)

    film.link = ''
    var wikiSearch = await fun.querySearch(`${film.title} (film)`,'en')
    if(wikiSearch == null) wikiSearch = await fun.querySearch(film.title,'en')
    if(wikiSearch != null){
        const article = await fun.queryPage(wikiSearch,'en')
        if(article){
            const articleUrl = article.content_urls.desktop.page
            film.link = articleUrl
        }
    }

    if(filmQuery.poster_path == null){film.illustration = ''} 
    else{film.illustration = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${filmQuery.poster_path}`}

    film.color = await fun.getDominantColor(film.illustration)

    film.genres = buildList(filmQuery.genres)

    // filmQuery.status
    
    if(filmQuery.release_date){film.released = new Date(filmQuery.release_date)
    }else{film.released = ''}

    film.countries = buildList(filmQuery.production_countries)

    film.description = fun.cutString(filmQuery.overview)

    film.otitle = filmQuery.original_title
    
    // const power = (Math.max(Math.floor((film.value)**1.25)*9333,1))
    film.power = fun.rescalePower(film.value, 500, 1.25)

    // console.log(filmQuery.adult)
    film.nsfw = filmQuery.adult
    
    return film
}

function buildList(listQuery){
    // console.log(listQuery)
    var itemList = ''
    listQuery.forEach(item => {
        const itemName = item.name
        itemList += `${itemName} - `
    });

    if(itemList != ''){
        let lastIndex = itemList.lastIndexOf(" -");
        itemList = itemList.substring(0, lastIndex);
    }

    return itemList
}