module.exports = rollInfo => {
    var rollText = `${rollInfo.rolls}`

    if(rollInfo.bonusRoll != 0){
        if(rollInfo.bonusRoll < 0){
            rollText += ' -'
        }else{
            rollText += ' +'
        }

        rollText += ` ${Math.abs(rollInfo.bonusRoll)}`
    }

    return rollText
}