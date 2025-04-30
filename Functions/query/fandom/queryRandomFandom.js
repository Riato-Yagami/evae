const maxCount = 500 // max 500
const rdStrLength = 3

module.exports = async (fandomName,tryCount) => {
    const search = randomSearch(rdStrLength)
    // console.log(search)

    
    // console.log(query)
    var itemList = await getItemList(fandomName,search,maxCount)
    if(!itemList) return null

    const itemCount = itemList.length
    // console.log(itemList.length)
    if(itemCount < maxCount) itemList = itemList.concat(await getItemList(fandomName,'',maxCount - itemCount))
    itemList = removeDuplicates(itemList)
    // console.log(itemList)
    // console.log(`new length ${itemList.length}`)
    return Object.values(itemList)[fun.randomInt(0,itemList.length)]
}

function randomSearch(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function getItemList(fandomName,search,count,tryCount){
    const query = `https://${fandomName}.fandom.com/api/v1/Articles/List?offset=${search}&limit=${count}`
    const body = await fun.queryAPI(query)
    if(!body){
        return null
    }

    if(!body.items){
        if(!tryCount) tryCount = 0
        if(tryCount > 1) return
        return await getItemList(fandomName,'',maxCount,tryCount+1)
    }

    const items = body.items.filter(item => !item.title.includes('/'))
    var titles = []
    Object.values(items).forEach(item => {
        titles.push(item.title)
    });
    return titles
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
  }