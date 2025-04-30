const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = (owner,asset) => {

    // const title = fun.parseTitle(asset)
    // const powerComment = `(x${config.powerMult})`

    // const description = `What asset do you want to attack **${owner.username}**' ${title}`
    // + `\n max of ${fun.parsePower(asset)} ${powerComment} or (your power) / ${config.powerDiv} ${emojies.power}`
    // + `\n\nType your asset name preceded by the needed tag (or emoji)`
    const id = fun.createId("asset")
    const modal = new ModalBuilder()
        .setCustomId(fun.createId("attack"))
        .setTitle('Attack');

    const assets = new TextInputBuilder()
        .setMaxLength(1000)
        .setCustomId(id)
        .setLabel('asset')
        .setStyle(TextInputStyle.Paragraph);

    const row = new ActionRowBuilder().addComponents(assets);

    modal.addComponents(row);
    modal.ids = [id]

    return modal
}