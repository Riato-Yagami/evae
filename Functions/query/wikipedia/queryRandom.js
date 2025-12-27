const queryOptions = require(__basedir + "/.env/queryOptions.js").wiki;

module.exports = async (lg) => {
    const query = `https://${lg}.wikipedia.org/api/rest_v1/page/random/summary`;

    // console.log("Wikipedia random query:", query);

    const body = await fun.queryAPI(query, queryOptions);

    // console.log("Wikipedia random query result:", body);

    if (!body) return null;

    return body;
};
