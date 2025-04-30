const fetch = require('node-fetch');

module.exports = async url => {

    // console.log(url)
    return new Promise(async function(resolve,reject){
        // console.log(url)

        await fetch(url)
            .then(response => response.text())
            .then(data => {
                // console.log(data.length)
                resolve(data)
            })
            .catch(error => console.log(error))

        resolve(null)
            
    });
}