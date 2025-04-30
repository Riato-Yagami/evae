const Discord = require("discord.js")
const { Player } = require("discord-player")

global.__basedir = __dirname;
global.config = require(__basedir + '/config')
global.emojies = require(__basedir + "/botSettings/emojies")
global.table = require(__basedir + "/botSettings/table/table")

const intents = new Discord.IntentsBitField(config.intents)
const client = new Discord.Client({intents})
global.bot = client;

const loadCommands = require("./Loaders/loadCommands")
const loadEvents = require("./Loaders/loadEvents")
const loadFunctions = require('./Loaders/loadFunctions')
const loadAPIFunctions = require('./Loaders/loadAPI')
const webhook = require("./Task/webhook.js")
const clock = require("./Task/clock.js")
const topggPoster = require("./Task/topggPoster.js")

global.mPlayer = new Player(bot, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})

global.mPlayer = new Player(client);

bot.commands = new Discord.Collection()
bot.color = "#ffffff";
// fun 
global.fun = loadFunctions
global.api = loadAPIFunctions

bot.login(config.beta? config.betaBotToken : config.botToken)

loadCommands()
loadEvents()

webhook()
clock()
if(!config.beta) topggPoster()

bot.on("guildCreate", guild => {
    fun.addServer(guild);
    fun.playerCount();
})

if(config.bulkQueryFilms) fun.bulkQueryFilms(config.bulkQueryPart)