const { EmbedBuilder } = require('discord.js');

module.exports = (page) => {
    let embed = new EmbedBuilder()
        .setColor(fun.colordleColor())
        .setTitle(`Tuto ${page.page} / ${page.tutoLength}`)
        .setFooter({ text: page.reward
    })

    page.objectives.forEach(obj => {
        // const objective = obj.objective
        // console.log(obj)
        embed.addFields(
            { name: objective.dscr, value: objective.objective }
        );
    })

    return embed
}