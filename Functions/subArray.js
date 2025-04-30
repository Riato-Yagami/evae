module.exports = (arr,length) => {
    if(!arr) return
    const arrLength = arr.length
    var subArrs = []

    for (let i = 0; i < arrLength; i+=length) {
        const subbArr = arr.slice(i,Math.min(arrLength, i+length));
        subArrs.push(subbArr)
    }

    return subArrs
}