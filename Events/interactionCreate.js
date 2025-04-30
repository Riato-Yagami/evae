const Discord = require("discord.js")
const config = require("../config")

module.exports = async (_,interaction) =>{
    if(interaction.type === Discord.InteractionType.ApplicationCommand){

        if(config.bulkQueryFilms){
            fun.reply(interaction,'Not available sorry')
            return
        }
        await interaction.deferReply()

        await fun.handleInteraction(interaction)

        let command = require(`../Commands/${interaction.commandName}`)

        command.run(interaction,interaction.options)
        
        fun.tuto(interaction)
    }
}