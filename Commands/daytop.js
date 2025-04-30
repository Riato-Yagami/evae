const dscr = require(__basedir + "/botSettings/description")

module.exports = {
    name : "daytop",
    sort : 10,
    description : "Todays top claims",
    ldscr : "Get a list of best claims of the day",
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "Boolean",
            name: "yesterday",
            description: `default: false`,
            ldscr: `Get yesterday's top`
            +` (**false** by default)`,
            required: false
        }
    ],

    async run(message,args){
        
        const yesterday = args.getBoolean("yesterday")

        var date = new Date()

        if(yesterday) date = new Date(date.setDate(date.getDate()-1));
        
        var assets = await fun.getAssets(null,null,date,true)

        fun.displayAssets(message,assets,null,'p',0,1)
    }
}