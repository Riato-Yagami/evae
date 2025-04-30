const localeCodes = require('locale-codes');

module.exports = {
    name : "setlang",
    sort : 10,
    description: `Server language`,
    ldscr : "Choose a language for your server"
    +"\nAffects wikipedia rolls and some text",
    example : '/setlang lang: fr',
    permission : 0,
    dm: false,
    options : [
        {
            type: "String",
            name: "lang",
            description: `ex: 'en' / 'fr' / 'es' ...`,
            ldscr: `Choose the language tag corresponding to the language you want`
            +`, ex: 'en' / 'fr' / 'es' ...`,
            required: true
        },
    ],

    async run(message,args){
        

        const lang = args.getString("lang").toLowerCase()

        const localeData = localeCodes.getByTag(lang);

        if(!localeData){
            fun.reply(message, `tag **${lang}** incorrect 🚫`)
            return
        }
        
        const testLang = await fun.queryRandom(lang)
        if(!testLang){
            fun.reply(message,`Can't set lang to **${localeData.name}** 🚫\nWikipedia probably do not support it`)
            return
        }

        await fun.setServerLang(message.guild,lang)
        fun.reply(message, `Lang set to **${localeData.name}** ${emojies.yes}`)
        
    }
}