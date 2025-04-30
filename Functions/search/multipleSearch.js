const spe = table.special

module.exports = async (message,searchString) => {
    const searchs = searchString.split(spe.separator)

    var assets ={
        found : [],
        notFound : []
    }

    for await (const search of searchs) {
        var asset = await fun.search(message,search)
        if(!asset || typeof asset === "string"){
            assets.notFound.push(search)
        }else{
            // console.log(asset)
            if(Array.isArray(asset)) asset = asset[0]
            assets.found.push(asset)
        }
    }

    return assets
}