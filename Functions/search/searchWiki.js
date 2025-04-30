module.exports = async (search,_,message) => {
    const lg = message.guild.language
    const articleName = await fun.querySearch(search,lg)
    // console.log(articleName)
    
    if(articleName == null) return null
    
    const articleQuery = await fun.queryPage(articleName,lg)
    return articleQuery
}