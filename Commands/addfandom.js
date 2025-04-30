module.exports = {
    name : "addfandom",
    sort : 9,
    description : "Add fandom",
    ldscr : "Add fandom to the roll list."
    +"\nFandom must have at least 500 pages to be rollable."
    +"\nThey must also have enough images"
    +"\nSee fandom list with /fandom",
    example:"/addfandom fandom : dragonball",
    options: [
        {
            type: "String",
            name: "tag",
            description: "fandom tag",
            ldscr : "Fandom must be added using their tag"
            + "\nFor the Dragon ball Wiki https://dragonball.fandom.com it would be \'dragonball\'",
            required: true
        }
    ],
    permission : "Aucune",
    dm: false,

    async run(message,args){
        

        const tag = args.getString("tag").replace(/\s/g,'')

        fun.addFandom(message,tag)
        return
    }
}