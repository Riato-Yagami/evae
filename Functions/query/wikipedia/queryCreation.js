queryOptions = { 'User-Agent': 'evae (https://colordle.net/; jules.pesin@gmail.com) wiki.js' }

module.exports = async (title,lg) => {
    const formatedTitle = encodeURIComponent(title)
    const query = `https://${lg}.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvlimit=1&rvprop=timestamp&rvdir=newer&titles=${formatedTitle}`

    const body = await fun.queryAPI(query,queryOptions)
    if(!body) return

    const page = Object.values(body.query.pages)[0]
    const firstRevision = Object.values(page.revisions)[0]
    const timestamp = firstRevision.timestamp
    return timestamp
}