module.exports = {
    name : "serverinfo",
    sort : 9,
    description : "Server Info",
    ldscr : `Get information about your server:`
    +`\n-language`
    +`\n-enabled categories and fandom`,
    permission : "Aucune",
    dm: false,

    async run(message){
        let guild = message.guild

        embed = await fun.serverInfoEmbed(guild)

        fun.reply(message,{embeds: [embed]})
    }
}