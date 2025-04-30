module.exports = (dateA,dateB) => {
    const timeA = dateA.getTime();
    const timeB = dateB.getTime();
    const diff = timeA - timeB

    const abs = Math.abs(diff)

    var timeInfo = {
        negative : diff < 0,
        hours :  Math.floor(abs / 3600000),
        mins : Math.floor((abs % 3600000) / 60000),
        secs : Math.floor((abs % 60000) / 1000)
    }

    return timeInfo
    const hours = Math.floor(diff / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return [negative, hours, mins, secs];

    return `${(mins> 9)? '' : '0'}${mins}:${(secs> 9)? '' : '0'}${secs}`
}