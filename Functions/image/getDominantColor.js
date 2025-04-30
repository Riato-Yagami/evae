const Vibrant = require('node-vibrant');
const color = require('color');
const convertToPng = require("./convertToPng.js");
const fs = require('fs');

module.exports = async (imageURL,convert = true) => {
    return new Promise(async function(resolve,reject){
        // var time = "Get dominant color time"
        // console.time(time)
        // console.log(imageURL)
        if(imageURL == ''){
            resolve(0x0099FF); return;
        }

        // console.log('starting conversion')
        if(convert) imageURL = await convertToPng(imageURL)
        // console.log('converted')
        Vibrant.from(imageURL).getPalette((err, palette) => {
        if (palette == null) {
            // console.log(err); 
            resolve(0x0099FF); return;
        }
        if(convert){
            try {
                fs.unlinkSync(imageURL)
            } catch (error) {
                // console.log(error)
            }
        }
        
        var dominantColor = [000,000,000]
        try {
            dominantColor = palette.Vibrant.getHex();
        } catch (error) {
            // console.log(error)
        }
        
        colorResolvable = color(dominantColor).rgb().array();
        // console.log(colorResolvable)
        resolve(colorResolvable)
        });
    })
}