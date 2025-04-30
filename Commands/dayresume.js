const dscr = require(__basedir + "/botSettings/description")

module.exports = {
    name : "dayresume",
    sort : 10,
    description : "Todays log",
    ldscr : "Get a list of all acquisitions of the day",
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "Boolean",
            name: "yesterday",
            description: `default: false`,
            ldscr: `Get yesterday resume`
            +` (**false** by default)`,
            required: false
        }
    ],

    async run(message,args){
        
        const yesterday = args.getBoolean("yesterday")

        var date = new Date()

        // console.log(date)
        if(yesterday) date = new Date(date.setDate(date.getDate()-1));
        
        var assets = await fun.getAssets(null,message.guild.id,date)
        fun.displayAssets(message,assets,null,null,0,1)
    }
}