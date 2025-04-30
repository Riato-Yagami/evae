const prx = table.prefix

module.exports = async (fandomQuery) => {
    var fandom = {}

    fandom.link = fandomQuery.basepath + fandomQuery.url

    const body = await fun.getBody(fandom.link)
    const article = fun.getArticle(body)

    // const noRedirectLink = fandom.link + '?redirect=no'
    // // console.log(noRedirectLink)
    // const bodyNoRedirect = await fun.getBody(noRedirectLink)
    // const noRedirect = fun.getArticle(bodyNoRedirect,true)

    fandom.fdTag = fandomQuery.fdTag

    fandom.id = prx.fandom + fandomQuery.fdTag + fandomQuery.id

    // console.log(fandom.id)

    fandom.title = fandomQuery.title
    fandom.article = article.title || ''

    if(fandom.title != article.title){
      // console.log(`${fandom.title} sub article of ${fandom.article}`)
      const pTitle = fandom.title.toLowerCase()
      const aTitle = fandom.article.toLowerCase()
      if(aTitle == pTitle
        || aTitle.includes(pTitle)
        || isOneLetterOff(aTitle, pTitle)
        || missingLetter(aTitle,pTitle)
      ){
        // console.log('redirect')
        const redirectQuery = await fun.searchFandom(fandom.article, fandom.fdTag)
        const redirect = await fun.parseFandomQuery(redirectQuery)
        // console.log(redirect)
        return redirect
      }
    }
    

    fandom.pageCount = Number(fun.getPageCount(body))
    
    article.value = article.article.length || 1
    
    if(fandom.title != fandom.article){
        // console.log(`${fandom.title} sub article of ${fandom.article}`)
        fandom.value = Math.ceil(article.value / 10)
    }else{
        fandom.value = article.value
    }

    var images = []

    if(article.image) images.push(article.image)
    if(fandomQuery.thumbnail) images.push(fandomQuery.thumbnail)
    
    fandom.fdName = article.siteName

    const tag = await fun.getFdTag(fandom)
    if(tag) fandom.fdTag = tag[0].fdTag

    fandom.illustration = fun.getImageFromBody(
      body,
      fandom,
      false, 
      images) || ''

    fandom.released = new Date(await fun.getFdHistory(fandom.link))

    if(!isValidDate(fandom.released)) fandom.released = ''
    
    if(fandom.illustration && fandom.illustration != ''){
        fandom.color = await fun.getDominantColor(fandom.illustration,false)
        // fandom.color = await runFunctionWithTimeout(fun.getDominantColor,fandom.illustration)
    }

    if(!fandom.color) fandom.color = [255,197,0]
    // console.log(fandom.color)

    var description = fandomQuery.abstract
    if(!description) description = article.description
    fandom.description = fun.cutString(description || '')
    // console.log(fandom)
    
    const addedFd = await fun.getFdAssets(fandom.fdTag)
    // console.log(addedFd)
    var values = [fandom.value]

    if(addedFd){
        addedFd.forEach(fd => {
            values.push(fd.value)
        });
    }

    const stats = fun.arrStats(values);

    // console.log(stats.max);
    // const max = Math.min(stats.max, 2*stats.mean)

    fandom.power = fun.rescalePower(fandom.value, stats.max / 1.2, 1.7)

    // fun.addToDb(fandom, bot)

    return fandom
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

async function runFunctionWithTimeout(fun,args) {
    try {
      const result = await Promise.race([
        fun(args),
        new Promise((resolve, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 5000)
        )
      ]);
      
      return result
      // use the result variable here
    } catch (err) {
      if (err.message === 'Timeout') {
        // console.log(args)
        // console.log('Function took too long to complete');
        // handle the timeout error here, e.g. by skipping the function
      } else {
        // console.log('Function failed with error:', err);
        // handle any other errors that may have occurred
      }
    }
}

function isOneLetterOff(str1, str2) {
  if (Math.abs(str1.length - str2.length) > 1) {
    return false;
  }
  let diffCount = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      diffCount++;
      if (diffCount > 1) {
        return false;
      }
    }
  }
  return diffCount === 1;
}

function missingLetter(s1, s2) {
  if (s1.length !== s2.length + 1 && s1.length !== s2.length - 1) {
    return false;
  }
  
  if (s1.length > s2.length) {
    for (let i = 0; i < s1.length; i++) {
      if (s1.slice(0, i) + s1.slice(i + 1) === s2) {
        return true;
      }
    }
  } else {
    for (let i = 0; i < s2.length; i++) {
      if (s2.slice(0, i) + s2.slice(i + 1) === s1) {
        return true;
      }
    }
  }
  
  return false;
}