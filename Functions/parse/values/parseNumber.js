const lg = require(__basedir +"/botSettings/language").numbersLg

module.exports = (number) => {
    // console.log(number.toLocaleString(lg))
    return number.toLocaleString(lg).replace(/\s/g, ' ')
}