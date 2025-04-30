module.exports = {
    name : "profilesettings",
    sort : 9,
    description : "Set profile settings",
    ldscr : "Change your profile settings",
    permission : "Aucune",
    example : "/profilesettings asset: 🎮 PanikoZoo",
    dm: false,
    options : [
        {
            type: "String",
            name: "asset",
            description: `Profile Asset`,
            ldscr: `Choose an asset that you own to appear on your profile`,
            required: true
        },
    ],

    async run(message,args){
        
        const search = args.getString('asset')

        var asset = await fun.search(message, search)

        if(typeof asset === "string"){
            fun.reply(message, `No ${asset} : ***${search.trim()}*** found ${emojies.no}`)
            return
        }

        if(Array.isArray(asset)){
            asset = asset[0]
        }

        const title = fun.parseTitle(asset)
        const owner = await fun.owner(asset, message, bot)

        if(!owner || owner.id != message.user.id){
            fun.reply(message,`You do not own ${title} ${emojies.no}`)
            return
        }

        // console.log(player)
        await fun.setAssetProfile(message.player,asset)
        
        fun.reply(message,`${title} set as profile asset ${emojies.yes}`)
    }
}