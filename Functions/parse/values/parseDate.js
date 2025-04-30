module.exports = async (message,date,time = false,lg,weekday) => {
    if(!lg){
        if(!message){
            lg = 'en'
        }else{
            lg = message.guild.language
        }
    } 
    // console.log(lg)
    if(date == '') return '\u200B'

    var options = {
        day : 'numeric',
        localeMatcher: 'lookup'
    };
    // console.log(weekday)
    if(weekday){
        options.weekday = 'long'
    }else{
        options.month = 'long',
        options.year = 'numeric'
    }


    if(time){
        options.hour = 'numeric'
        options.minute = 'numeric'
        options.second = 'numeric'
    }
    const normalizedLang = Intl.getCanonicalLocales(lg)[0];
    // console.log(lg)
    // console.log(normalizedLang)
    const formatter = new Intl.DateTimeFormat(normalizedLang, options);
    var res
    try {
        res = formatter.format(date)
    } catch (error) {
        res = formatter.format(new Date(0))
    }

    // console.log(res)
    return res;
}