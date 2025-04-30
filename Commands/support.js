module.exports = {
    name : "support",
    sort : 12,
    description : "Patreon",
    ldscr : "Try this if you want to support my work",
    permission : "Aucune",
    dm: false,

    async run(message){
        

        const embed = fun.supportEmbed(bot)
        fun.reply(message,{embeds : [embed]})
    }
}