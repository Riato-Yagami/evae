// const Vibrant = require('node-vibrant');
// const color = require('color');
// const convertToPng = require("./convertToPng.js");
// const fs = require('fs');
// const path = require('path');

// function cleanImageURL(url) {
//     return url.split('/revision')[0];
// }


// module.exports = async (imageURL, convert = true) => {
//     let finalPath = imageURL;
    
//     // console.log(`img for conversion before getting color : ${imageURL}`)

//     // ✅ Conversion auto si WebP
//     if (path.extname(imageURL).toLowerCase() === '.webp' && convert) {
//         try {
//         finalPath = await convertToPng(imageURL);
//         } catch (err) {
//         console.error("WebP conversion failed:", err);
//         return 0x0099FF;
//         }
//     }

//     return new Promise((resolve) => {

//         Vibrant.from(finalPath).getPalette((err, palette) => {
//         if (err || !palette || !palette.Vibrant) {
//             resolve(0x0099FF);
//             return;
//         }

//         let dominantColor = palette.Vibrant.getHex();
//         const colorResolvable = color(dominantColor).rgb().array();

//         // ✅ Nettoyage
//         if (convert && finalPath !== imageURL) {
//             try {
//             fs.unlinkSync(finalPath);
//             } catch (e) {}
//         }

//         resolve(colorResolvable);
//         });
//     });
// };


const Vibrant = require('node-vibrant');
const color = require('color');
const axios = require('axios');

module.exports = async (imageURL) => {

    if (!imageURL) {
        return 0x0099FF;
    }

    let response;

    try {
        response = await axios.get(imageURL, {
        responseType: 'arraybuffer',
        timeout: 10000,
        maxRedirects: 5,
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; DiscordBot/1.0)',
            'Accept': 'image/*'
        }
        });
    } catch (err) {
        console.error('Image request failed:', err.message);
        return 0x0099FF;
    }

    const contentType = response.headers['content-type'];

    // 🚨 This is the key check
    if (!contentType || !contentType.startsWith('image/')) {
        console.error('Not an image, received:', contentType);
        return 0x0099FF;
    }

    const imageBuffer = Buffer.from(response.data);

    if (!imageBuffer || imageBuffer.length < 100) {
        console.error('Invalid image buffer');
        return 0x0099FF;
    }

    return new Promise((resolve) => {
        Vibrant.from(imageBuffer).getPalette((err, palette) => {
        if (err || !palette || !palette.Vibrant) {
            resolve(0x0099FF);
            return;
        }

        const dominantColor = palette.Vibrant.getHex();
        resolve(color(dominantColor).rgb().array());
        });
    });
};
