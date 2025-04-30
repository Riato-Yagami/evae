const { GatewayIntentBits } = require('discord.js');

const tokens = require(__basedir + "/.env/tokens.js")

module.exports = {
    botId : "1041742351468597258",
    devID : "288758081951629312",
    botToken : tokens.botToken,
    betaBotToken: tokens.betaBotToken,
    webhookToken : tokens.webhookToken,
    beta : true,
    // link : "https://discord.com/api/oauth2/authorize?client_id=1041742351468597258&permissions=2419452992&scope=bot",
    link : 'https://discord.com/api/oauth2/authorize?client_id=1041742351468597258&permissions=2150705216&scope=bot',
    betaLink :"https://discord.com/api/oauth2/authorize?client_id=1074082439200260286&permissions=8&scope=bot",
    // intents : 3237952,
    // intents : 8, //Admin
    intents : [
        // GatewayIntentBits.
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
    ],
    powerMult : 3,
    powerDiv : 2,
    collectorTime : 60000,

    // bulkQueryFilms : true, // force main database be carefull
    bulkQueryPart : {start: 1000, end: 3000}
}