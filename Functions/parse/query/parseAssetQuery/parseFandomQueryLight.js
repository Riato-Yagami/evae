const prx = table.prefix

module.exports = async (fandomQuery) => {
    var fandom = {}

    fandom.link = fandomQuery.basepath + fandomQuery.url

    const body = await fun.getBody(fandom.link)
    if(!body) return
    
    const article = fun.getArticle(body)

    fandom.fdTag = fandomQuery.fdTag

    fandom.title = fandomQuery.title

    fandom.pageCount = Number(fun.getPageCount(body))
    
    var images = []

    if(article.image) images.push(article.image)
    if(fandomQuery.thumbnail) images.push(fandomQuery.thumbnail)


    fandom.illustration = fun.getImageFromBody(
        body,fandom.title,
        true, 
        images)


    fandom.fdName = article.siteName

    return fandom
}