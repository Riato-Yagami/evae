const prx = table.prefix

module.exports = str => {
    let array = str.replace(/\s/g,'').split('')
    array = array.filter(p => Object.values(prx).includes(p))
    let uniqueChars = [...new Set(array)];
    return uniqueChars
}