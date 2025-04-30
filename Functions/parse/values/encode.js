module.exports = str => {
    return encodeURIComponent(str).replace(/'/g,"''")
}