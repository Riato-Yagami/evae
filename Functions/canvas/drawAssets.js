const util = require('util');
const gm = require('gm').subClass({ imageMagick: true });
const fetch = require('node-fetch');
const fs = require('fs');

const sizePromise = util.promisify(gm().size);

module.exports = async (assets, outputFileName = 'image/combined.png', outputFormat = 'png') => {
    
    var wbuffer
    fetch("https://sabe.io/images/saturn.png").then(res =>
        res.body.pipe(wbuffer = fs.createWriteStream(outputFileName))
    )

    gm(wbuffer)
    .resize(100, 100)
    .toBuffer('PNG',function (err, buffer) {
    if (err) return console.log(err);
    console.log('done!');
    })

//     const url = "https://sabe.io/images/saturn.png";

// const response = await fetch(url);

// const blob = await response.blob();

// const arrayBuffer = await blob.arrayBuffer();

// const buffer = Buffer.from(arrayBuffer);

// fs.writeFile(outputFileName, JSON.stringify(data), (err) => err && console.error(err));

    // console.log(`Buffer size: ${buffer.length}`);
    // // Delete the output file if it already exists
    // if (fs.existsSync(outputFileName)) {
    //     fs.unlinkSync(outputFileName);
    // }

    // gm(buffer).write(outputFileName, function (err) {
    //     if (err){
    //         console.log(err)
    //         return 
    //     } 
    //     console.log('Created an image from a Buffer!');
    // });
}