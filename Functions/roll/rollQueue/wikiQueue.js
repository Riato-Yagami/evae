const config = require(__basedir + "/config")

const tblFun = require(__basedir + "/botSettings/table/tableFun")

const queueMax = config.beta? 2 : 3

var queuing = false

module.exports = async (lang) => {
    // console.log(lang)
    let asset = await fun.getWikiInQueue(lang)
    // console.log(asset)
    if(!asset || asset.queueLength < queueMax){
        tryQueue(lang)
    }

    return asset
}

function tryQueue(lang) {
    if(queuing){
        return
    }
    enqueue(lang)
}

async function enqueue(lang){
    queuing = true
    for (let i = 0; i < queueMax; i++) {
        await queue(lang)
        // console.log('queued')
        await sleep(2000)
    }
    queuing = false
    return
}

async function queue(lang) {
    const asset = await roll(lang)
    if(!asset) return
    fun.addToDb(asset)
    fun.addToQueue(asset.id,'wiki')
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function roll(lang){
    const rollFun = tblFun.roll.wiki;
    // console.log('rolling ' + lang)
    let assetQuery = await rollFun(null,lang)
    // console.log(assetQuery)
    if(typeof assetQuery === 'string' || !assetQuery) return
        
    const parser = tblFun.queryParser.wiki
    const asset = await parser(assetQuery)
    // console.log(asset)
    return asset
}
