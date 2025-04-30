const descriptionMax = 200
module.exports = (str,nChar = descriptionMax,bold = true) => {
    if(str.length<=nChar) return str

    let substring = str.substr(0, nChar);
    let lastSpacePos = substring.lastIndexOf(' ');
    let result = substring.slice(0, lastSpacePos) 
    + ` ${bold? '**' : ''}[...]${bold? '**' : ''}`;
  
    return result;
}