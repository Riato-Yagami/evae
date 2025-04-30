module.exports = async (guild,cts,enable) =>{
    const guildID = guild.id
    let ects = await fun.getEnabledCategories(guildID)

    cts.forEach(ct => {
        
        if(enable && !ects.includes(ct)){
            ects += ct
        } 
        else if(!enable) ects = ects.replace(ct,'')
    });

    if(ects == '') return false

    const query = `UPDATE server
    SET categories = '${ects}'
    WHERE guild = '${guildID}'`

    // console.log(ects)
    fun.queryDb(query)

    guild.prefix = ects

    return true
}