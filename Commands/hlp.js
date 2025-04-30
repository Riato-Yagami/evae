const hlp = require(__basedir + '/ressources/text/hlp.js')

module.exports = {
    name : "hlp",
    description : "Evaé' summary",
    ldscr : "Get a quick summary of Evaé",
    permission : "Aucune",
    dm: false,

    async run(message){
        // console.log(message.guild)
        const lg = message.guild.language

        var hlpLg = hlp.en
        if(lg == 'fr') hlpLg = hlp.fr

        const embed = fun.hlpEmbed(hlpLg)
        fun.reply(message,{embeds : [embed]})
    }
}