module.exports = async (message,tag) => {

    const hg = emojies.hourglass
    var emoId = 0
    var title
    const link = `https://${tag}.fandom.com`

    const fdDb = await fun.getFd(tag)

    if(fdDb){
        const fd = fdDb[0]
        title = `[${fd.title}](${link})`
        fun.reply(message,`${emojies.yesb} **${title}** already added`)
        return fd
    }
    

    fun.reply(message,`${hg[emoId]} Searching fadom with tag **${(tag)}**`)

    // var search = await fun.queryRandomFandom(tag)
    const fandomQuerys = await fun.queryFandomTop(tag)

    // console.log(fandomQuerys)
    if(!fandomQuerys){
        fun.reply(message,`${emojies.no} No fandom with tag : ***${tag}*** found`)
        return
    }

    const fandom = await fun.parseFandomQuery(fandomQuerys[0])

    // fun.reply(message,`Testing **${(fandom.fdName)}** ${emojies[emoId]}`)

    const oldTag = await fun.getFdTag(fandom)

    if(oldTag){
        const fd = await fun.addFdTag(fandom)
        title = `[${fd.title}](${link})`
        fun.reply(message,`${emojies.yesb} **${title}** already added`)
        return fd
    }

    var sample = []

    // console.log(fandom)
    title = `[${fandom.fdName}](${link})`

    sample.push(fandom)

    for (let i = 1; i < fandomQuerys.length; i++) {
        emoId = ((emoId == 0)? 1 : 0)
        fun.reply(message,`${hg[emoId]} Testing **${title}**`)
        let fd = await fun.parseFandomQuery(fandomQuerys[i])
        sample.push(fd)
    }

    images = []
    sample.forEach(fd => {
        // console.log(fd.title)
        if(fd.illustration) images.push(fd.illustration)
        fun.addToDb(fd, bot)
    });

    if(images.length < fandomQuerys.length - 2){
        const fd = await fun.addFdTag(fandom,0)
        fun.reply(message,`${emojies.no} **${title}** has not enough illustrations`)
        return fd
    }

    const fd = await fun.addFdTag(fandom)

    if(fd.pC < 500){
        fun.reply(message,`${emojies.no} **${title}** has not enough pages (only **${fd.pC}**)`)
    }else{
        fun.reply(message,`${emojies.yes} **${title}** added to the list`)
    }
    

    return fd
}