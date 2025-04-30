const dscr = require(__basedir + "/botSettings/description")
const prx = table.prefix
const spe = table.special

module.exports = {
    name : "search",
    sort : 3,
    description : "Search asset",
    ldscr : "Find asset by its name",
    example : '/search search: g tattooz\n'
    +'/search search: 🐹 Dragonite VSTAR /Pokémon GO/ 1\n',
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "String",
            name: "search",
            description: dscr.description + 
            ` ; option ${spe.option}`,
            ldscr: `Add a category emoji or tag before the asset name :\n`
            + dscr.description 
            +`\n\nIf needed, also include option between two "**${spe.option}**" like fandom tag or Pokémon TCG collection`,
            required: true
        },
    ],

    async run(message,args){
        
        const search = args.getString('search')

        const asset = await fun.search(message, search)
        // console.log(Array.isArray(asset))

        if(typeof asset === "string"){
            fun.reply(message, `No ${asset} : ***${search.trim()}*** found`)
            return
        }

        var prefix
        if(Array.isArray(asset)){
            prefix = asset[0].id.charAt(0)
        }else{
            prefix = asset.id.charAt(0)
        }

        if(Array.isArray(asset)){
            asset[0].powerUp = await fun.getPowerUp(message.guild.id,asset[0].id)
            asset[0].color = await fun.getDominantColor(asset[0].illustration, prefix != prx.poke)
            replyEmbed = await fun.buildAssetEmbed(message,asset[0])

            const multiple = asset.length > 1
            fun.embedReply(asset[0], message, replyEmbed, bot, true, multiple)

            if(!multiple) return
            
            for await (const a of asset) {
                a.powerUp = await fun.getPowerUp(message.guild.id,a.id)
                a.color = await fun.getDominantColor(a.illustration,prefix != prx.poke)
            };

            fun.multipleEmbedReply(asset, message, bot)
            return
        }

        replyEmbed = await fun.buildAssetEmbed(message,asset)

        // console.log(asset.nsfw)
        if(asset.nsfw){
            servNsfw = await fun.getServerNsfw(message.guild)
            if(!servNsfw){
                fun.reply(message, `**NSWF** ${emojies.nsfw} content is disabled of on your server.`
                + ` You may enable it with the admin command ${fun.parseTextCmd('/setnsfw')}`)
                return
            } 

            if(!message.channel.nsfw){
                fun.reply(message, `${emojies.error} The content you are trying to access is flagged as **NSWF** ${emojies.nsfw}`
                +`\n You may only access it from a **NSFW ${emojies.nsfw} #channel**`)
                return
            }
        }

        await fun.embedReply(asset, message, replyEmbed, bot, true)
    }
}