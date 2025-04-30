const srt = table.sort
module.exports = async (interation,query) => {
    var assets = await fun.getAssets(interation.user.id, interation.guild.id)
    fun.sortAssets(assets)

    return {
        res : 'assets recovered',
        success : true,
        assets
    }
}