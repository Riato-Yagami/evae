module.exports = (text) =>{
    bot.commands.forEach(cmd => {
        text = text.replace(new RegExp(`(?<!\\w)\\/${cmd.name}\\b`, 'g'), fun.parseCmdName(cmd))
    });

    return text
}