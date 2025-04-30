const nswf = require(__basedir +'/botSettings/nsfw')

module.exports = string =>{
    const lowerStr = string.toLowerCase()
    
    return nswf.test(lowerStr)
}