const cheerio = require('cheerio');
const pretty = require("pretty");
const fs = require("fs")

module.exports = (html,noRedirect) => {

    const $ = cheerio.load(html);
    data = pretty($.html())

    // const path = noRedirect ? `data/bodyNoRedirect.html` : `data/body.html`
    // fs.writeFileSync(path,data)

    var results = {}
    results.siteName = $('meta[property="og:site_name"]').attr('content')
    results.title = $('meta[property="og:title"]').attr('content')
    results.image = $('meta[property="og:image"]').attr('content')
    results.description = $('meta[property="og:description"]').attr('content')
    // results.article = 
    
    const listItems = $("p");
    // console.log(listItems.length);
    
    results.article = ''
    listItems.each(function (idx, el) {
        results.article += $(el).text().replace(/\n/g,'')
        // console.log($(el).text());
    });
    // console.log(results)

    return results

}