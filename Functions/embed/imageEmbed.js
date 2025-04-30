const { EmbedBuilder } = require('discord.js');
module.exports = (embed, images) => {
    var embeds = []
    // console.log(embed)
    images.forEach(image => {
        // let clone = Object.assign({}, embed);
        let clone = new EmbedBuilder(embed)
        // console.log(clone)
        clone.setImage(image)
        embeds.push(clone)
    });

    return embeds
}