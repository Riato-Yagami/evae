const dscr = require(__basedir + "/botSettings/description")

module.exports = {
    name : "challenge",
    sort : 5,
    example : '/challenge assets: 🔖 Ribbot /mudae/ member: @Chahine\n'
    +'/challenge assets: 🍿 Lavell Crawford: Home for the Holidays < 📖 Ebenezer Bryce < p Aether Paradise Conservation Area /Guardians Rising/ member: @Neo',
    description : "Challenge user",
    ldscr : "Challenge user's assets with your own asset to capture them",
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "String",
            name: "assets",
            description: dscr.separator,
            ldscr: 'Your assets\n' +dscr.separator,
            required: true
        },
        {
            type: "user",
            name: "member",
            description: "challenged user",
            description: "Challenged user",
            required: true
        },
    ],

    async run(message,args){
        

        fun.versus(message,args)
    }
}