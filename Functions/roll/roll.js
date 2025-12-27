const prx = table.prefix
const tblFun = require(__basedir + "/botSettings/table/tableFun")
const maxRoll = 3
module.exports = async (message,prefix,option) => {
    return await roll(message,prefix,option)
}

async function roll(message, prefix, option, rollCount = 0){
    // return await fun.search(message, "s thriller")
    if(!prefix) prefix = await fun.randomPrefix()
    var asset
    let guild = message.guild

    if((guild.fandomMode != 0 && prefix == 'f') || option){
        var tag = ''
        if(option) tag = await fun.getFd(option, null, true)
        if(tag == ''){
            asset = await fun.fandomQueue(await fun.rollFdTag(message))
        }else if(tag){
            asset = await fun.fandomQueue(tag[0].tag)
        }
    }else if(guild.language != 'en' && prefix == 'w'){
        asset = await fun.wikiQueue(guild.language)
    }
    else{
        asset = await fun.rollQueue(prefix)
        // console.log("rollQueue")
    }

    // if(asset){
    //     console.log("found asset in special queue:", asset.title)
    // }else{
    //     console.log("no asset in special queue")
    // }
    // console.log("found asset in queue:", asset.title)
    
    if(!asset){
        const category = Object.keys(prx).find(key => prx[key] === prefix);

        // console.log("rolling in category:", category)

        const rollFun = tblFun.roll[category];
        
        let assetQuery = await rollFun(message,option)

        // console.log("assetQuery:", assetQuery)

        if(typeof assetQuery === 'string'){
            fun.reply(message,assetQuery)
            return
        }else if(assetQuery){
            const parser = tblFun.queryParser[category]
            asset = await parser(assetQuery)
        } 
    }

    // console.log("rolled asset:", asset ? asset.title : null)
    // console.log("illustration :", asset ? asset.illustration : null)

    if(!asset){
        fun.reply(message,'Roll failed 🚫')
        return
    }

    asset.powerUp = await fun.getPowerUp(message.guild.id,asset.id)

    if(!asset.queue) fun.addToDb(asset)

    if(
        asset.illustration == '' 
        && rollCount < maxRoll){
        // console.log(`${asset.title} has no image`)
        return roll(message,prefix,option, rollCount + 1)
    }
    // console.log('res -> ' +fandom.title)
    if(!asset.nsfw) return asset

    // if(message.guild.nsfw) return asset
    console.log('NSFW disabled')

    return await roll(message,prefix,option)
}