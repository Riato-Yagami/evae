const Discord = require("discord.js")
const fs = require('fs')

module.exports = async (_,message) => {
    let prefix = "?"
    let messageArray = message.content.split(" ")
    let commandName = messageArray[0].slice(prefix.length)
    let args = messageArray.slice(1)

    // if(!message.content.startsWith(prefix)) return;

    // switch (commandName) {
    //   case "p": commandName = "ping"; break;
    //   case "w": commandName = "wikiroll"; break;
    //   case "ws": commandName = "wikisearch"; break;
    //   default:
    //     break;
    // }

    // fs.access(`./Commands/${commandName}.js`, fs.F_OK, (err) => {
    //     if (err) {
    //       //console.error(err)
    //       return fun.reply(message,"command do not exist")
    //     }
      
    //     let command = require(`../Commands/${commandName}`)
    //     command.run(message,args)
    // })
}