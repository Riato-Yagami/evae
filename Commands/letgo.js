const dscr = require(__basedir + "/botSettings/description")
const aEmo = require(__basedir + "/botSettings/action").emoji

module.exports = {
    name : "letgo",
    sort : 7,
    description : "Let go assets",
    ldscr : "Let go of assets",
    example : "/letgo assets: 🎮 PanikoZoo < m get out",
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "String",
            name: "assets",
            ldscr : "Assets to let go\n"+dscr.separator,
            description: dscr.separator,
            required: true
        },
    ],

    async run(message,args){
        
        
        const searchString = args.getString('assets')

        var assets = await fun.multipleSearch( message,searchString)

        await fun.sortOwned( assets, message.user, message)

        const replyEmbeds = fun.tradeEmbed( assets, 'let go')

        fun.reply(message,{ embeds: replyEmbeds})

        if(assets.owned.length == 0){
            return
        }
        
        collected = await fun.confirmButton(message,message.user,aEmo.letgo)

        if(!collected) return false

        for await (const asset of assets.owned) {
            await fun.letGo(message,message.user,asset)
        }

        return true
    }
}