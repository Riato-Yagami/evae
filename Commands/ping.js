module.exports = {
    name : "ping",
    sort : 13,
    description : "Get latency",
    permission : "Aucune",
    dm: false,

    async run(message){
        fun.reply(message,`Ping : \`${(bot.ws.ping)}\``)
    }
}