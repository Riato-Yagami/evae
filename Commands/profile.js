module.exports = {
    name : "profile",
    sort : 9,
    description : "Get player profile",
    ldscr : "Get player profile containing informations like their asset count and date they started playing with Evaé",
    permission : "Aucune",
    dm: false,
    options :[
        {
            type: "user",
            name: "member",
            description: "user",
            ldscr: "Select a user",
            required: false
        },
        {
            type: "boolean",
            name: "global",
            description: "Get global profile across all servers",
            ldscr: "Get ",
            required: false
        },
        {
            type: "boolean",
            name: "server",
            description: "Get server profile",
            required: false
        },
        {
            type: "boolean",
            name: "bot",
            description: "Get bot stats",
            required: false
        },
    ],

    async run(message,args){
        
        var user = args.getUser("member") || message.user
        var server = args.getBoolean("server") || false
        var global = args.getBoolean("global") || false
        var botstats = args.getBoolean("bot") || false

        if(botstats){
            global = true
            server = true
        }

        var userID, guildID

        if(!server){
            userID = user.id
        }
        if(!global){
            guildID = message.guild.id
        }

        profile = {
            assetCount : await fun.getAssets( userID, guildID, null, null, null,true),
            power : await fun.getAssets( userID, guildID, null, null, null,false,true),
            global : global,
            server : server,
            powerBank : await fun.getPowerBank(userID, guildID),
        }

        // console.log(profile.powerBank)

        if(server){
            var guild = message.guild
            if(global){
                const guilds = await fun.getServer(null)
                guild = guilds[0]
                profile.name = 'Global'
                profile.picture = bot.user.displayAvatarURL()
                profile.serverCount = fun.onlineServers().length
                profile.playerCount = (await fun.playerCount(true))[0].count
            }else{
                profile.name = guild.name
                profile.picture = guild.iconURL({ dynamic: true })
                profile.playerCount = (await fun.getPlayer(guild,null,true)).count
            }
            profile.date = new Date(guild.date)
        }else{
            var player
            if(global){
                const players = await fun.getPlayer(null,user)
                profile.serverCount = players.length
                // console.log(players)
                player = players[0]
            }else{
                player = message.player
            }
            profile.date = new Date(player.date)
            profile.name = user.username
            profile.picture = user.displayAvatarURL()

            if(!global && player.profileAsset){
                // console.log(player.profileAsset)
                const asset = await fun.queryAssetById(player.profileAsset)
                if(asset){
                    const owner = await fun.owner(asset, message)
                    if(owner && owner.id == user.id){
                        profile.asset = asset
                    }else{
                        fun.setAssetProfile(player,null)
                    }
                }else{
                    fun.setAssetProfile(player,null)
                }
            }
        }

        const embed = await fun.profileEmbed(message,profile)

        fun.reply(message,{embeds : [embed]})
    }
}