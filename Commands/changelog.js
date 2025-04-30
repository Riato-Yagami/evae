module.exports = {
    name : "changelog",
    sort : 12,
    description : "Update info",
    ldscr : "Learn about what's new with Evaé",
    permission : "Aucune",
    dm: false,

    async run(message){
        const embeds = await fun.changelogEmbed(message)
        fun.displayPages(message,embeds,'log',embeds.length);
    }
}