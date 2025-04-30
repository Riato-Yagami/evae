const config = require(__basedir + "/config")

const tblFun = require(__basedir + "/botSettings/table/tableFun")

const queueMax = config.beta? 2 : 3

var queuing = false

module.exports = async (fandom) => {
    // console.log(fandom)
    let asset = await fun.getFandomInQueue(fandom)
    // console.log(asset)
    if(!asset || asset.queueLength < queueMax){
        tryQueue(fandom)
    }

    return asset
}

function tryQueue(fandom) {
    if(queuing){
        return
    }
    enqueue(fandom)
}

async function enqueue(fandom){
    queuing = true
    for (let i = 0; i < queueMax; i++) {
        await queue(fandom)
        // console.log('queued')
        await sleep(2000)
    }
    queuing = false
    return
}

async function queue(fandom) {
    const asset = await roll(fandom)
    if(!asset) return
    fun.addToDb(asset)
    fun.addToQueue(asset.id,'fandom')
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function roll(fandom){
    const rollFun = tblFun.roll.fandom;
    // console.log('rolling ' + fandom)
    let assetQuery = await rollFun(null,fandom)
    // console.log(assetQuery)
    if(typeof assetQuery === 'string' || !assetQuery) return
        
    const parser = tblFun.queryParser.fandom
    const asset = await parser(assetQuery)
    // console.log(asset)
    return asset
}
