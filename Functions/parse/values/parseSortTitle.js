const srt = table.sort

module.exports = async (message,asset,sort) =>{
    const title = fun.parseTitle(asset)
    var parsedResult = ''
    var post
    switch (sort) {
        case srt.date:
            post = await fun.parseDate(message,asset.released)
            break;
        case srt.power:
            post = `${fun.parsePower(asset)}`
            break;
        case srt.genres:
            post = asset.genres || asset.album
            break;
        case srt.artist:
            post = asset.artist
            break;
        case srt.country:
            post = asset.countries
            break;
        case srt.platform:
            post = asset.platforms
            break;
    }
    parsedResult += title
    if(post){
        if(post != '\u200B') parsedResult += ` - ${post}`
    }

    return parsedResult
}