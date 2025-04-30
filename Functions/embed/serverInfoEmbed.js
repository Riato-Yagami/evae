const { EmbedBuilder } = require('discord.js');
const localeCodes = require('locale-codes');

const emo = table.emoji
const prx = table.prefix

module.exports = async (guild,enableCategory) => {

    const image = guild.iconURL({ dynamic: true })
    const dColor = await fun.getDominantColor(image)

    let dscr = ``
    var count = 1
    const lineLen = 3

    Object.values(prx).forEach(p => {
        let category = Object.keys(prx).find(key => prx[key] === p);
        dscr += `${emo[category]}`
        +`${guild.prefix.includes(p)? emojies.yes : emojies.no}`
        +`${(count%lineLen == 0)? '\n' : ' '}`
        count++
    });

    if(guild.fandom){
        guild.fandom.forEach(fd =>
            dscr += `\n${fd.enabled? emojies.yes : emojies.no} [${fd.title}](${fd.link})`
        )
    }


    if(guild.fandomMode != null){
        var fdModeText
        switch (guild.fandomMode) {
            case -1:
                fdModeText = 'Blacklist'
                break;
            case 0:
                fdModeText = 'Default'
                break;
            case 1:
                fdModeText = 'Whitelist'
                break;
        }
    
        dscr += `\nFandom mode: **${fdModeText}**`
    }

    if(guild.language && !enableCategory){
        const language = localeCodes.getByTag(guild.language).name;
        const lgtext = `Language : **${language}**`
        dscr += `\n\n${lgtext}`
    }
    
    embed = new EmbedBuilder()
        .setColor(dColor)
        .setDescription(`${dscr}`)
    
    if(!enableCategory){
        embed.setTitle(guild.name)
            .setThumbnail(image)
            .setFooter({text :
                `fandom whitelist and blacklist -> /fandom server: true`
                +`\nserver profile -> /profile server: true`
            })
    }
    
    return embed
}