const fs = require("fs")
const cheerio = require('cheerio');

const ImgRgx = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif))/g

const headerRegex = /page-content/
const footerRegex = /page-footer/

const parserRegex = /mw-parser-output/

const titleOnly = ['starwars']

module.exports = (body,asset,useCheerio,images) => {
  const title = asset.title
  const tag = asset.fdTag

  body = removeFooter(body)
  body = removeHeader(body)
  // body = removeParser(body)

  // fs.writeFileSync(`data/body.html`,body)

  // fs.writeFileSync(`data/body_${encodeURIComponent(title)}.txt`,body)
  var firstFilter
  if(useCheerio){
    const links = getAllLinks(body)
    // console.log(links)
    firstFilter = links.filter(link => {
      if(link) link.match(/\.(png|jpg|jpeg|gif|svg)/i)}
      )
  }else{
    firstFilter = body.match(ImgRgx)
  }

  if(images){
    if(!firstFilter) firstFilter = []
    firstFilter = firstFilter.concat(images)
  } 
  firstFilter = removeDuplicates(firstFilter)
  // if(tag) firstFilter = getFandomImages(firstFilter,tag)
  const filteredLinks = filterStrings(firstFilter,false,bannedWords)
  // console.log(filteredLinks)
  var filteredTitle = []
  if(title) filteredTitle = filterStrings(filteredLinks,true,[title,title.replace(/\s/g,'_')])
  if(filteredTitle.length < 1 && title){
    const splitTitle = title.split(' ')
    filteredTitle = sort(filteredLinks,splitTitle)
    // console.log(filteredTitle)
  }

  // if(filteredTitle == [] && !titleOnly.includes(tag) ) filteredTitle = filteredLinks
  
  const gifs = filteredTitle.filter(link => link.match(/\.(gif)/i))
  // console.log(filteredTitle)
  var revisions = getRevisions(gifs)
  // console.log(revisions)
  if(revisions.length == 0){
    // console.log("getting revisions")
    revisions = getRevisions(filteredTitle)
  } 
  // console.log(revisions)

  var imgss = [revisions,gifs,filteredTitle]
  // console.log(imgss)
  if(!titleOnly.includes(tag)) imgss.push(getRevisions(filteredLinks,true))
  imgss.some(function(imgs) {
    illustrations = imgs;
    // console.log(illustrations)
    return imgs[0];
  });

  // console.log(illustrations)
  
  return illustrations[0]
  // return(
  //   revisions[0] || 
  //   gifs[0] ||
  //   filteredTitle[0] || 
  //   filteredLinks[0] || 
  //   '')
}

const bannedWords = [
  'vignette',
  'jwplayer',
  'Site-logo',
  'commons',
  '_only.png',
  'Ambox_notice.png',
  '_Icon.png',
  'Lock_Space.png',
  'data:image',
  'hydra-media',
  'Special:Upload',
  //DOCTOR WHO
  'ImagesAvailable.png',
  'InvalidSource.png',
  'RealWorld.png',
  'ProseStub.png',
  'WikipediaInfo.png',
  'TerminologyStub.png',
  ',',
  //WOW
  'Discord_logo.png',
  'Icon-delete',
  //TROP
  'Farm-Fresh_balance.png',
  //YOSHI
  'Site-community-image'
]

function filterStrings(strings, includes, words) {
  return strings.filter(string => includes == words.some(bannedWord => string.toLowerCase().includes(bannedWord.toLowerCase())));
}

function sort(strings, words) {
  const filteredStrings = strings.filter(string => words.some(bannedWord => string.toLowerCase().includes(bannedWord.toLowerCase())));
  filteredStrings.sort((a, b) => {
    const aCount = words.filter(word => a.toLowerCase().includes(word.toLowerCase())).length;
    const bCount = words.filter(word => b.toLowerCase().includes(word.toLowerCase())).length;
    return bCount - aCount;
  });
  return filteredStrings;
}

function getAllLinks(body){
  const $ = cheerio.load(body);
  const imageLinks = $('img').toArray().map(img => $(img).attr('src'));
  // const links = $('a').toArray().map(a => $(a).attr('href'));
  // console.log(links);
  return imageLinks
}

function removeDuplicates(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}

function getFandomImages(arr,tag){
  return arr.filter(item => item.includes(tag));
}

function getRevisions(arr,all){
  if(all) return arr.filter(item => item.includes('/revision'))
  return arr.filter(item => item.includes(arr[0] + '/revision'));
}

function removeFooter(body){
  return body.split(footerRegex)[0]
}

function removeHeader(body){
  return body.split(headerRegex)[1]
}

function removeParser(body){
  return body.split(parserRegex)[0]
}
    