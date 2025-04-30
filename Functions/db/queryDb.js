// const clc = require("cli-color");

module.exports = async (query) => {
    return await tryQuery(query)
}

async function tryQuery(query,tryCount = 0) {

    if(!bot.db) return

    return new Promise((resolve, reject) => {
        bot.db.query(query, async function (err,queryRes){
            if(err){
                console.log(err)

                await reconnect(bot)

                if(tryCount < 1) {
                    resolve(tryQuery(query,tryCount + 1))
                    return
                }
                
                resolve(null) ; return 
            }
            if(!queryRes){
                resolve(null) ; return 
            }
            
            resolve(Object.values(queryRes)) ; return
        })
    })
}

async function reconnect(bot){
    bot.db.destroy()
    await sleep(500)
    await fun.connectDb(bot)
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}