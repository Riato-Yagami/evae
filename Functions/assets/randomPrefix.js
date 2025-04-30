const prx = table.prefix
const odds = table.odds

module.exports = async guild => {
    if(guild){
        prxArr = guild.prefix.split('')
    } 
    else{
        var prxArr = Object.values(prx)
    }

    var weightedPrx = []

    prxArr.forEach(p => {
        let category = Object.keys(prx).find(key => prx[key] === p);
        for (let j = 0; j < odds[category]; j++) {
            weightedPrx.push(p)
        }
    });
    return weightedPrx[Math.floor(Math.random() * weightedPrx.length)]
}