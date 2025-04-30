const localeCodes = require('locale-codes');

module.exports = {
    name : "setnsfw",
    sort : 10,
    description: `Able of disable NSFW 🔞 content`,
    ldscr : "Able of disable Not Safe For Work 🔞 content,"
    +"by default NSFW content is turn off",
    permission : 0,
    dm: false,
    options : [
        {
            type: "Boolean",
            name: "nsfw",
            description: `default : false`,
            ldscr: `False -> disable NSFW 🔞, True -> enable NSFW 🔞`
            +` (**false** by default)`,
            required: false
        },
    ],

    async run(message,args){
        
        const nsfw = args.getBoolean("nsfw")

        await fun.setServerNsfw(message.guild,nsfw)
        fun.reply(message, `**NSFW** ${emojies.nsfw} content **${nsfw? `enabled ${emojies.yes}` : `disabled ${emojies.yesb}`}**`)
        
    }
}