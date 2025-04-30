const prx = table.prefix
// const special = (__basedir + "/botSettings/table").special

module.exports = async (pokeQuery,colorAfter = false) => {
    var poke = {}

    poke.id = prx.poke + pokeQuery.id

    poke.title = pokeQuery.name

    poke.setname = pokeQuery.set.name

    // const search = `p ${poke.title} ${special.option}${poke.setname}${special.option}`
    poke.homonym = 0
    var homonyms = await fun.querySearchPoke(poke.title, poke.setname)

    if(homonyms){
        homonyms = homonyms.filter( p => (p.name == poke.title) && (p.set.name == poke.setname))

        if(homonyms.length > 1){
            for (let i = 0; i < homonyms.length; i++) {
                if(homonyms[i].id == pokeQuery.id){
                    poke.homonym = i+1
                }
            }
        }
    } 
    
    var value = 0
    var valueh = 0
    
    if(pokeQuery.tcgplayer){
        poke.link = pokeQuery.tcgplayer.url

        if(pokeQuery.tcgplayer.prices && pokeQuery.tcgplayer.prices.length>0){
            valueh = Object.values(pokeQuery.tcgplayer.prices)[Object.values(pokeQuery.tcgplayer.prices).length-1].market
            
            if(pokeQuery.tcgplayer.prices.normal){
                value = pokeQuery.tcgplayer.prices.normal.market
            }
        }
    }
    
    if(pokeQuery.cardmarket && !value && !valueh){
        poke.link = pokeQuery.cardmarket.url
        value = pokeQuery.cardmarket.prices.averageSellPrice
        valueh = pokeQuery.cardmarket.prices.reverseHoloTrend
    }else{poke.link = ''}

    poke.value =  Number(value || 0)
    poke.valueh = Number(valueh || 0)

    // if(!pokeQuery.images) console.log(pokeQuery)
    poke.illustration = pokeQuery.images.large

    if(colorAfter){poke.color = [0,0,0]}
    else{poke.color = await fun.getDominantColor(poke.illustration,false)}
    
    poke.released = new Date(pokeQuery.set.releaseDate)

    if(pokeQuery.types){
        poke.types = buildList(pokeQuery.types)
    }else if(pokeQuery.types){
        poke.types = buildList(pokeQuery.subtypes)
    }else{
        poke.types = pokeQuery.supertype
    }

    poke.artist = pokeQuery.artist

    poke.rarity = pokeQuery.rarity

    // poke.power = Math.floor(Math.max(poke.value,poke.valueh,0.25)**1.77*1065)
    poke.power = fun.rescalePower(Math.max(poke.value,poke.valueh,0.01), 400, 1.1)
    // console.log(poke)

    return poke
}

function buildList(listQuery){
    // console.log(listQuery)
    var itemList = ''
    Object.values(listQuery).forEach(item => {
        // console.log(item)
        itemList += `${item} - `
    });

    if(itemList != ``){
        let lastIndex = itemList.lastIndexOf(" -");
        itemList = itemList.substring(0, lastIndex);
    }

    return itemList
}