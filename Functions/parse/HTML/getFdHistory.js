const history = '?dir=prev&action=history'
const dateRgx = /\d{1,2}\s\w{2,8}\s\d{4}/g

module.exports = async (url) => {

    const historyBody = await fun.getBody(url + history)

    const matchs = historyBody.match(dateRgx)

    if(matchs) return matchs[0]
    return null
}