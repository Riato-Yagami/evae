const fetch = require('node-fetch');
const axios = require('axios');

module.exports = async (query, queryOptions = {}, type = 'axios') => {
    switch (type) {
        case 'fetch':
        return await qfetch(query, queryOptions);
        case 'axios':
        default:
        return await qaxios(query, queryOptions);
    }
};

async function qfetch(query, queryOptions) {
    try {
        // Ensure queryOptions is a proper object for node-fetch
        const fetchOptions = queryOptions || {};
        if (!fetchOptions.headers) fetchOptions.headers = {};

        const res = await fetch(query, fetchOptions);
        const body = await res.json();
        return body;
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
}

async function qaxios(query, queryOptions) {
    try {
        const response = await axios.get(query, queryOptions);
        return response.data;
    } catch (error) {
        if (error.response) {
        console.error(
            'Axios error:',
            error.response.status,
            error.response.data
        );
        } else {
        console.error(error.message);
        }
        return null;
    }
}
