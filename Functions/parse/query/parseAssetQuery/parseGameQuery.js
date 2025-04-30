const prx = table.prefix
// const lg = require("../../../../../botSettings/getters/getOptions")().lang

module.exports = async (gameQuery) => {
    var game = {}

    game.id = prx.game + gameQuery.id

    game.title = gameQuery.name

    game.value = Number(Math.floor(gameQuery.reviews_count + gameQuery.added/2))

    game.link = ''
    var wikiSearch = await fun.querySearch(`${game.title} (game)`,'en')
    if(wikiSearch == null) wikiSearch = await fun.querySearch(game.title,'en')
    if(wikiSearch != null){
        const article = await fun.queryPage(wikiSearch,'en')
        if(article){
            const articleUrl = article.content_urls.desktop.page
            game.link = articleUrl
        }
    }

    game.illustration = gameQuery.background_image || ''

    game.color = await fun.getDominantColor(game.illustration)

    if(gameQuery.released){game.released = new Date(gameQuery.released)
    }else{game.released = ''}

    game.genres = buildList(gameQuery.genres)

    game.platforms = buildList(gameQuery.platforms)

    game.score = gameQuery.rating || 0

    game.description = fun.cutString(gameQuery.description_raw)
    
    game.otitle = gameQuery.name_original

    game.power = fun.rescalePower(game.value, 15000, 1.2)
    
    game.nsfw = fun.nsfw(game.title)
    // console.log(game.nsfw)
    return game
}

function buildList(listQuery){
    var itemList = ''
    Object.values(listQuery).forEach(item => {
        // console.log(item)
        var itemName
        if(item.platform){ itemName = item.platform.name }
        else{ itemName = item.name }
        itemList += `${itemName} - `
    });

    if(itemList != ''){
        let lastIndex = itemList.lastIndexOf(" -");
        itemList = itemList.substring(0, lastIndex);
    }

    return itemList
}