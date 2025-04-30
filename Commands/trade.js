const dscr = require(__basedir + "/botSettings/description")
const spe = table.special

module.exports = {
    name : "trade",
    sort : 4,
    description : "Trade assets",
    ldscr : "Trade asset or multiple assets",
    example : '/trade assets: f Ribbot /mudae/ member: @Chahine\n'
    +'/trade assets: w Otomedius < 📖 Ebenezer Bryce < p Aether Paradise Conservation Area /Guardians Rising/ member: @Neo',
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "String",
            name: "assets",
            description: 'your assets : ' +dscr.separator,
            ldscr: `List the assets you want to trade.`
            +`\nDon't forget to add tags before them and options if needed`
            +`\nSeparate your assets with "**${spe.separator}**"`,
            required: true
        },
        {
            type: "user",
            name: "member",
            description: "traded user",
            ldscr: "Choose the user you want to trade with",
            required: true
        },
    ],

    async run(message,args){
        

        fun.versus(message,args,true)
    }
}
