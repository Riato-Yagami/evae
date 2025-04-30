const prx = table.prefix
const emo = table.emoji

module.exports = (search) => {
    if(!search) return [null,null]

    let prefix
    search = search.trim()

    if(search.length < 1){
        return [null,null]
    }
    // console.log(search)

    [search,prefix] = testEmoji(search, emo.fandom, prx.fandom)
    if(!prefix) [search,prefix] = testEmoji(search, emo.film, prx.film)
    if(!prefix) [search,prefix] = testEmoji(search, emo.game, prx.game)
    if(!prefix) [search,prefix] = testEmoji(search, emo.music, prx.music)
    if(!prefix) [search,prefix] = testEmoji(search, emo.poke, prx.poke)
    if(!prefix) [search,prefix] = testEmoji(search, emo.wiki, prx.wiki)

    // console.log([search,prefix])
    if(!prefix){
        prefix = search.charAt(0).toLowerCase();
        
        if(!Object.values(prx).includes(prefix)){
            prefix = prx.wiki
        }else{
            search = search.substring(1).trim();
        }
        
    }
    // console.log([search,prefix])
    return [search,prefix]
}

function testEmoji(search, emoji, prefix){
    // console.log(search)
    if(search.startsWith(emoji)) return [search.split(emoji)[1].trim(), prefix]
    else return [search,null]
}