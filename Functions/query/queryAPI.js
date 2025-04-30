const fetch = require('node-fetch');
const axios = require('axios');

module.exports = async (query,queryOptions = {json: true}, type = 'axios') => {
    if(!queryOptions) queryOptions = {json: true}
    switch (type) {
        case 'axios':
            return await qaxios(query,queryOptions)
        case 'fetch':
            return await qfetch(query,queryOptions)
    }
}

async function qfetch(query,queryOptions){
    try {
        res = await fetch(query, queryOptions);
        const body = await res.json();
        // if (res.ok) {
        //     return body;
        // }
        return body;
    } catch (err) {
        // console.log(err);
        return null;
    }
}

async function qaxios(query,queryOptions){
    try {
        const response = await axios.get(query, queryOptions);
        if (response.status >= 200 && response.status < 300) {
          return response.data;
        }
        return null;
    } catch (error) {
        // console.error(error);
        return null;
    }
}