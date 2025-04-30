module.exports = async (i) => {
    await fun.addUser(i.user)
    i.guild = await fun.getServer(i.guild)
    i.player = await fun.getPlayer(i.guild,i.user)
    return i
}