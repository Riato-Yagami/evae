module.exports = str => {
    return decodeURIComponent(str).replace(/''/g,"'")
}
