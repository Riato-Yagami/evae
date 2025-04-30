module.exports = async _ => {
    const musicQuery = await fun.queryRandomMusic(bot)
    return musicQuery
}