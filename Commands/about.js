module.exports = {
    name : "about",
    sort : 12,
    description : "General info",
    ldscr : "Get information about me",
    permission : "Aucune",
    dm: false,

    async run(message){
        

        const embed = fun.aboutEmbed(bot)
        fun.reply(message,{embeds : [embed]})
    }
}