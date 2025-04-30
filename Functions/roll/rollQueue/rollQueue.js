const config = require(__basedir + "/config")

const prx = table.prefix
const tblFun = require(__basedir + "/botSettings/table/tableFun")

const queueMax = config.beta? 2 : 5

const queuing = {
    fandom: false , 
    film: false , 
    game: false, 
    music: false,
    poke: false ,
    wiki: false 
}

module.exports = async (prefix) => {
    if(!prefix){
        // updateQueue()
        return
    }

    let asset = await fun.getAssetInQueue(prefix)

    if(!asset || asset.queueLength < queueMax){
        tryQueue(prefix)
    }

    return asset
}

function tryQueue(prefix) {
    const category = Object.keys(prx).find(key => prx[key] === prefix);
    if(queuing[category]){
        // console.log(`already queuing ${category}`)
        return
    }
    enqueue(category)
    
}

async function enqueue(category){
    queuing[category] = true
    for (let i = 0; i < queueMax; i++) {
        await queue(category)
        // console.log('queued')
        await sleep(1000)
    }
    queuing[category] = false
    return
}

async function queue(category) {
    const asset = await roll(category)
    if(!asset) return
    fun.addToDb(asset)
    fun.addToQueue(asset.id)
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function roll(category){
    const rollFun = tblFun.roll[category];
        
    let assetQuery = await rollFun()
    
    if(typeof assetQuery === 'string' || !assetQuery) return
        
    const parser = tblFun.queryParser[category]
    const asset = await parser(assetQuery)

    return asset
}
