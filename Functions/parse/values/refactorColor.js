module.exports = colorArray =>{
    for (let i = 0; i < 3; i++) {
        if(!colorArray[i]) colorArray[i] = 0
        colorArray[i] = Math.min(colorArray[i],255)
    }

    return colorArray
}