const cheerio = require('cheerio');

module.exports = html => {
    const $ = cheerio.load(html);
    const pageCount = $('.page-counter__value').text().replace(',', '').replace(/\s/, '');
    // console.log(pageCount);

    return pageCount

}