const url = require('url');
const fetch = require('node-fetch');
const sharp = require('sharp');
const fs = require('fs');

module.exports = async svgUrl => {
    const parsedUrl = url.parse(svgUrl);
    const file = parsedUrl.pathname.split('/').pop();
    const fileExtension = file.split('.').pop();
    const name = file.split('.')[0]
    const fileName = encodeURIComponent(name.substring(0,Math.min(name.length,3)))

    // if(fileExtension == 'webp'){
    //     sharp(svgUrl)
    //     .png()
    //     .toFile(`image/${fileName}.png`)
    //     .then(() => {
    //         console.log('Conversion successful');
    //     })
    //     .catch(err => {
    //         // console.error('Error occurred:', err);
    //     });
    // }

    // Fetch the SVG image
    const svgResponse = await fetch(svgUrl);
    const svgBuffer = await svgResponse.buffer();

    // Convert the SVG to a PNG image
    const pngBuffer = await sharp(svgBuffer)
        .png()
        .toBuffer();

    // Download the PNG image
    await fs.writeFileSync(`image/${fileName}.png`, pngBuffer);

    return `image/${fileName}.png`
    // Check if the file extension is SVG
    // if (fileExtension !== 'svg') {
    //     return svgUrl
    // }

    // // Fetch the SVG image
    // const svgResponse = await fetch(svgUrl);
    // const svgBuffer = await svgResponse.buffer();

    // // Convert the SVG to a PNG image
    // const pngBuffer = await sharp(svgBuffer)
    //     .png()
    //     .toBuffer();

    // // Download the PNG image
    // await fs.writeFileSync(`image/${fileName}.png`, pngBuffer);

    // return [fileName,pngBuffer]
}