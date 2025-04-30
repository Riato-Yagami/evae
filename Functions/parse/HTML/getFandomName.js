const regexs = [
    // /(?<=\|)(.*?)(?=Wiki \|)/g,
    /(?<=\|)(.*?)(?=\|)/g,
    // /(?<= \- )(.*?)(?= Wiki)/g,
    // /(?<= \– )(.*?)(?= Wiki)/g
    /(?<= \- )(.*?Wiki)/g,
    /(?<= \– )(.*?Wiki)/g,
    /(?<=\-)(.*?)(?=\-)/g
]

module.exports = body => {
    var match = ''
    regexs.forEach(rgx => {
        if(match != '') return;
        let m = body.match(rgx)
        // console.log(m)
        if(m){
            if(m[0] != ''){
                match = m[0]
            } 
        }
        
    });
    return match.trim()
}