const {Events} = require('discord.js');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');

const button = new ButtonBuilder()
    .setCustomId('confirmInput')
    .setEmoji(emojies.yes)
    .setLabel('Input')
    .setStyle(ButtonStyle.Success)
    .setDisabled()

const action = new ActionRowBuilder()
    .addComponents(button);

module.exports = async (message, modal) => {

    // Show the modal to the user
    await message.showModal(modal);

    return new Promise((resolve, reject) => {
        const interactionListener = async (interaction) => {
            if (!interaction.isModalSubmit() || interaction.customId != modal.data.custom_id) return;
            
            
            fun.reply(interaction,{components: [action]})
            // fun.delete(interaction)
            var res = [];
            modal.ids.forEach((id) => {
              res.push(interaction.fields.getTextInputValue(id));
            });
          
            // console.log(res)
            resolve(res);
          
            // Remove the event listener
            bot.off(Events.InteractionCreate, interactionListener);
        };
          
        // Attach the event listener
        bot.on(Events.InteractionCreate, interactionListener);
    })
}