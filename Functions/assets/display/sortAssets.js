const srt = table.sort

module.exports = (assets, sort) => {
    // console.log(assets)
    switch (sort) {
        case srt.date: sortByDates(assets); break;
        case srt.power: sortByPower(assets); break;
        case srt.title: sortByTitle(assets); break;
        case srt.color: sortByColor(assets); break;
        case srt.genres: sortByGenres(assets); break;
        case srt.artist: sortByArtist(assets); break;
        case srt.country: sortByCountry(assets); break;
        case srt.platform: sortByPlatform(assets); break;
        default : sortByHistory(assets); break;
    }
}

function sortByHistory(assets) {
    assets.sort((a, b) => {
      const A = a.history
      const B = b.history
      if (A < B) { return 1;}
      if (A > B) { return -1;}
      return 0;
    });
}

function sortByDates(assets){
    assets.sort((a, b) => {
        const dateA = new Date(a.released);
        const dateB = new Date(b.released);
      
        // If dateA is before dateB, return a negative number
        if (dateA < dateB) {
          return -1;
        }
      
        // If dateA is after dateB, return a positive number
        if (dateA > dateB) {
          return 1;
        }
      
        // If dateA and dateB are equal, return 0
        return 0;
      });
}

function sortByPower(assets){
    assets.sort((a, b) => {
        const A = a.power
        const B = b.power
        if (A < B) { return 1;}
        if (A > B) { return -1;}
        return 0;
      });
}

function sortByTitle(assets){
    assets.sort((a, b) => {
        const A = a.title
        const B = b.title
        if (A < B) { return -1;}
        if (A > B) { return 1;}
        return 0;
      });
}

function sortByGenres(assets){
    assets.sort((a, b) => {
        const A = a.genres || a.album
        const B = b.genres || b.album
        if (A < B) { return -1;}
        if (A > B) { return 1;}
        return 0;
      });
}

function sortByArtist(assets){
    assets.sort((a, b) => {
        const A = a.artist
        const B = b.artist
        if (A < B) { return -1;}
        if (A > B) { return 1;}
        return 0;
      });
}

function sortByCountry(assets){
    assets.sort((a, b) => {
        const A = a.countries
        const B = b.countries
        if (A < B) { return -1;}
        if (A > B) { return 1;}
        return 0;
      });
}

function sortByPlatform(assets){
    assets.sort((a, b) => {
        const A = a.platforms
        const B = b.platforms
        if (A < B) { return -1;}
        if (A > B) { return 1;}
        return 0;
      });
}

function sortByColor(assets){
    assets.sort((a, b) => {
        const A = getHSL(a.color)[0]
        const B = getHSL(b.color)[0]
        if (A < B) { return -1;}
        if (A > B) { return 1;}
        return 0;
      });
}

function getHSL(rgb) {
    let [r, g, b] = rgb;
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
    h = s = 0;
    } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
    }

    return [h, s, l];
}