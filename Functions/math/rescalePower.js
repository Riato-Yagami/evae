module.exports = (value, max, power = 1, newMax = 27000000) => {

    if(value > 3*max){
        // console.log('above max')
        value -= (value - max) ** 0.97
    }

    if(value > 2*max){
        // console.log('above max')
        value -= (value - max) ** 0.97
    }

    if(value > max){
        // console.log('above max')
        value -= (value - max) ** 0.97
    }

    const scaledValue = (value / max)**power;

    // Rescale the value between 0 and newMax
    const rescaledValue = scaledValue * newMax;
    
    // Convert the rescaled value to an integer
    const intValue = Math.ceil(rescaledValue);
    
    return Math.max(intValue,1);
}