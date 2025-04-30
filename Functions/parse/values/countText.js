module.exports = (count,bonus) => {
    var countText = `${fun.parseNumber(count)}`

    if(bonus != 0){
        if(bonus < 0){
            countText += ' -'
        }else{
            countText += ' +'
        }

        countText += ` ${fun.parseNumber(Math.abs(bonus))}`
    }

    return countText
}