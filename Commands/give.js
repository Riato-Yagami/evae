const dscr = require(__basedir + "/botSettings/description")

module.exports = {
    name : "give",
    sort : 6,
    description : "Give assets",
    example : '/give assets: 🎵 Faire Et Refaire /Ascendant vierge/ member: @Vertmo',
    permission : "Aucune",
    dm: false,
    options : [
        {
            type: "String",
            name: "assets",
            description: dscr.separator,
            ldscr: 'Gifted assets\n' +dscr.separator,
            required: true
        },
        {
            type: "user",
            name: "member",
            description: "gifted user",
            description: "Gifted user",
            required: true
        },
    ],

    async run(message,args){
        

        fun.versus(message,args,false,true)
    }
}
