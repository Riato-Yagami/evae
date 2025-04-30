module.exports = async message => {
    let tags
    if(message){
        tags = await fun.getFd(null,message.guild,true,true)
    }else{
        tags = await fun.getFd(null,null,true,true)
    }
     
    // console.log(tags)
    
    var tag
    if(tags) tag = tags[fun.randomInt(0,tags.length)].tag
    // console.log(tag)
    return tag || 'mudae'
}