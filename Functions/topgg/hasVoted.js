const key = require(__basedir + "/botSettings/apiKey").topgg;
const botId = require(__basedir + '/config').botId;

const queryOptions = {headers: {
    'Authorization': key,
  },
  json : true
}

module.exports = async (userId) => {
    const query = `https://top.gg/api/bots/${botId}/check?userId=${userId}`
      
    const body = await fun.queryAPI(query,queryOptions)
    if(!body) return false
    return body.voted == 1
}