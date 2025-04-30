const emo = table.emoji
const prx = table.prefix
const special = table.special

module.exports = (asset, addEmoji = true, addLink = true) => {
    const prefix = asset.id.charAt(0)
    var title = ''
    var option

    if(asset.otitle && asset.otitle != asset.title) option = asset.otitle
    if(prefix == prx.poke) option = asset.setname
    if(prefix == prx.music) option = asset.artist
    if(prefix == prx.fandom) option = asset.fdTag

    if(option) title += ' ' + special.option + option + special.option
    // console.log(asset.homonym)
    if(asset.homonym > 0) title += ' ' + asset.homonym

    title = `${addLink? '**' : ''}${asset.title + title}${addLink? '**' : ''}`

    if(addLink && asset.link) title = `[${title}](<${asset.link}>)`

    if(addEmoji){
        var emoji = ''
        switch(prefix){
            case prx.fandom: emoji = emo.fandom
                break;
            case prx.film: emoji = emo.film
                break;
            case prx.game: emoji = emo.game
                break;
            case prx.music: emoji = emo.music
                break;
            case prx.poke: emoji = emo.poke
                break;
            case prx.wiki: emoji = emo.wiki
                break;
        }
        title = `${emoji} ${title}`
    }
        
    return title
}