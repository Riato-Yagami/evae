module.exports = _ => {
    const now = new Date()
    const mins = 59 - now.getMinutes()
    const secs = 60 - now.getSeconds()
    return `${(mins> 9)? '' : '0'}${mins}:${(secs> 9)? '' : '0'}${secs}`
}