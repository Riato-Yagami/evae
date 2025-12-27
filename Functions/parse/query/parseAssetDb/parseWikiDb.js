module.exports = wikiDb => {
    var wiki = {}

    wiki.id = wikiDb.id

    wiki.title = fun.decode(wikiDb.title)

    wiki.link = fun.decode(wikiDb.link)

    wiki.value = wikiDb.value

    wiki.power = wikiDb.power

    wiki.illustration = toWikiThumb(fun.decode(wikiDb.illustration))
    // console.log("[DB] Wiki illustration:", wiki.illustration);

    wiki.color =  stringToColor(wikiDb.color)

    wiki.released = wikiDb.released || ''

    wiki.category = fun.decode(wikiDb.category)

    wiki.description = fun.decode(wikiDb.description)

    return wiki
}

function stringToColor(str) {
    const values = str.split(',').map(Number);
    // return new color(values[0], values[1], values[2]).rgb().array();
    return [values[0], values[1], values[2]]
}

// function toWikiThumb(url, size = 512) {
//     if (!url || !url.includes('/upload.wikimedia.org/')) return url;
//     if (url.includes('/thumb/')) return url;

//     const parts = url.split('/');
//     const filename = parts.pop();
//     const path = parts.join('/');

//     return `${path}/thumb/${filename}/${size}px-${filename}`;
// }

function toWikiThumb(url, size = 512) {
    if (!url || !url.includes('upload.wikimedia.org')) return url;

    // Already a thumb URL
    if (url.includes('/thumb/')) return url;

    try {
        const parts = url.split('/');
        const filename = encodeURIComponent(parts.pop());
        const path = parts.join('/');

        return `${path}/thumb/${filename}/${size}px-${filename}`;
    } catch {
        return url;
    }
}





// function getFullWikimediaURL(thumbUrl) {
//     if (!thumbUrl.includes('/thumb/')) return thumbUrl; // Already full-size
//     // Example thumbnail URL:
//     // https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Fiesta_Bowl_2006_from_Flickr_81639095.jpg/330px-Fiesta_Bowl_2006_from_Flickr_81639095.jpg
//     const parts = thumbUrl.split('/thumb/');
//     const base = parts[0];       // https://upload.wikimedia.org/wikipedia/commons
//     const rest = parts[1].split('/'); 
//     // remove the last part (the /330px-...jpg)
//     rest.pop();
//     const fullPath = base + '/' + rest.join('/');
//     return fullPath;
// }
