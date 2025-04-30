module.exports = async fandomId => {
    const intRegex = /\d+/;
    const intMatch = fandomId.match(intRegex);
    const ID = intMatch ? intMatch[0] : null;
    // console.log(ID); // '59802'

    const strRegex = /^\D+/;
    const strMatch = fandomId.match(strRegex);
    const fd = strMatch ? strMatch[0].substring(1,strMatch[0].length) : null;
    // console.log(fd)

    const fandomQuery = await fun.queryFandomByID(ID,fd)
}