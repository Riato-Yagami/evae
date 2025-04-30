const prx = table.prefix
// const lg = require("../../../../../../botSettings/getters/getOptions")().lang

module.exports = async (wikiQuery) => {
    // console.log(wikiQuery)
    var wiki = {}

    wiki.id = prx.wiki + wikiQuery.lang + wikiQuery.wikibase_item

    wiki.title = wikiQuery.title

    var language = await fun.queryLanguage(wikiQuery.wikibase_item)

    if(language){
        language = language.filter(lg => !['be_x_old'].includes(lg))
        wiki.value = language.length
    }else{
        wiki.value = 1
    }
    
    wiki.link = wikiQuery.content_urls.desktop.page

    wiki.illustration = ''

    if(!wikiQuery.thumbnail
        || wikiQuery.thumbnail.source.includes(`https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Defaut.svg`)
    ){
        const lgs = language.filter(lg => ![wikiQuery.lang].includes(lg))
        // console.log(lgs)
        for await (const newLg of lgs) {
            // console.log(newLg)
            const trTitle = await fun.queryTitle(wikiQuery.wikibase_item,newLg)
            const trPage = await fun.queryPage(trTitle,newLg)
            if(trPage && trPage.thumbnail
                && !trPage.thumbnail.source.includes(`https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Defaut.svg`)
            )
            {
                // console.log(trPage.thumbnail.source)
                wiki.illustration = trPage.thumbnail.source
                break
            }
        };
    }else{ wiki.illustration = wikiQuery.thumbnail.source }

    wiki.color = await fun.getDominantColor(wiki.illustration)

    const timestamp = await fun.queryCreation(wiki.title,wikiQuery.lang)
    wiki.released = new Date(timestamp)

    wiki.category = wikiQuery.description || ''
    if(wiki.category.length > 1){
        wiki.category = wiki.category.charAt(0).toUpperCase() + wiki.category.slice(1);
    }

    wiki.description = `\u200B${fun.cutString(wikiQuery.extract)}`

    // wiki.power = Math.max(Math.floor((wiki.value**2)*333),1)
    wiki.power = fun.rescalePower(wiki.value, 160, 2.1)
    // console.log(wiki)

    return wiki
}