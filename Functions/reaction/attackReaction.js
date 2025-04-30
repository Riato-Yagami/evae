const { ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const aEmo = require(__basedir + "/botSettings/action").emoji

module.exports = async (asset, message, owner) => {

    var react = await fun.confirmButton(message,null,aEmo.attack,'attack', aEmo.attack, owner)

    if(!react) return

    fun.attack(message,asset,react.user,owner)
}