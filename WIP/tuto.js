module.exports = {
    name : "tuto",
    sort : 11,
    description : "Evaé Tutorial",
    ldscr : "Learn how Evaé works"
    + "\n+ Win some reward by doing it !",
    permission : "Aucune",
    dm: false,

    async run(message){
        

        tutoPage = await fun.getTuto(message)

        const embed = fun.tutoEmbed(tutoPage)

        fun.reply(message,{embeds : [embed]})
    }
}