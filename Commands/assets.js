const srt = table.sort
const dscr = require(__basedir + "/botSettings/description")

module.exports = {
    name : "assets",
    sort : 2,
    example: '/assets page: 3\n'+
    '/assets member: @Yuvraj sort: p image: false',
    description : "Asset list",
    ldscr : "Display asset list",
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "user",
            name: "member",
            description: "user",
            ldscr: "Select a user",
            required: false
        },
        {
            type: "String",
            name: "type",
            description: dscr.description,
            required: false
        },
        {
            type: "String",
            name: "sort",
            description: `power > ${srt.power}`
            + `; date > ${srt.date}`
            + `; title > ${srt.title}`
            + `; color > ${srt.color}`
            + `; artist > ${srt.artist}`
            + `; genres / album > ${srt.genres}`
            + `; country > ${srt.country}`
            + `; platform > ${srt.platform}`,
            ldscr: `Sort asset with these tags :\n`
            + `-power : **${srt.power}**\n`
            + `-date : **${srt.date}**\n`
            + `-title : **${srt.title}**\n`
            + `-color : **${srt.color}**\n`
            + `-artist : **${srt.artist}**\n`
            + `-genres / album : **${srt.genres}**\n`
            + `-country : **${srt.country}**\n`
            + `-platform : **${srt.platform}**`,
            required: false
        },
        {
            type: "Integer",
            name: "page",
            description: `start`,
            ldscr: `Review collection from a specific page`,
            required: false
        },
        {
            type: "Integer",
            name: "image",
            description: `0 to 4 - default: 1`,
            ldscr: `Choose how many image you want to be displayed`
            +` (**1** by default)`,
            required: false
        },
        {
            type: "Boolean",
            name: "text",
            description: `default : true`,
            ldscr: `Choose whether to display or not assets' text`
            +` (**true** by default)`,
            required: false
        },
    ],

    async run(message,args){
        
        var image = (args.getInteger("image") == 0)? 0 : (args.getInteger("image") || 1)
        var text = !(args.getBoolean("text") != null && !args.getBoolean("text"))
        var user = args.getUser("member") || message.user
        const prefixs = fun.getPrefix(args.getString("type"))[1]
        const sort = (args.getString("sort") || '').trim().charAt(0)
        var page = (args.getInteger("page") || 1) - 1

        // const fdIDs = await fun.getFdIds(message.user.id,message.guild.id)
        // console.log(fdIDs)

        // fdIDs.forEach(async fdID => {
        //     await fun.searchFandomById(fdID.assetID)
        // });

        var assets = await fun.getAssets( user.id, message.guild.id, null, null, prefixs)
        
        // fun.drawAssets(assets)
        
        fun.displayAssets(message,assets,user,sort,page,image,text)
    }
}



