const fs = require('fs');
const fetch = require('node-fetch');
const zlib = require('zlib');

module.exports = async () => {
    const date = getLastWeekMonday()
    // console.log(date)
    const savePath = `data/movie_ids.json`
    // const filePath = `data/movie_ids_${date}.json.gz`;
    const filePath = `data/movie_ids.json.gz`;

    if(fs.existsSync(filePath)){
        // console.log('already getting new ids')
        return
    }

    var buffer
    try { buffer = fs.readFileSync(savePath);
    } catch (error) {
        // console.log('no film ids file')
    }

    if(buffer != null){
        let data
        try {
            data = JSON.parse(buffer)
        } catch (error) {
            console.log('Invalid JSON')
        }
        if(data){
            const oldDate = data.date
            // console.log(oldDate)
            if (oldDate == date){
                return data.ids
            }
        }
    }

    // console.log("new date")

    const url = `http://files.tmdb.org/p/exports/movie_ids_${date}.json.gz`
    const res = await fetch(url);
    const fileStream = fs.createWriteStream(filePath);
    // res.body.pipe(fileStream);
    await new Promise((resolve, reject) => {
        res.body.pipe(fileStream);
        res.body.on("error", reject);
        fileStream.on("finish", resolve);
    });

    // console.log(url)
    // console.log("finished writing")
    
    const IDs = await readIDs(filePath)
    if(!IDs) return

    const data = {
        date: date,
        ids: IDs
    };
        
        fs.writeFile(savePath, JSON.stringify(data), (err) => {
        if (err) throw err;
        // console.log('The file has been saved!');
    });

    fs.unlinkSync(filePath)
    return IDs
}

async function readIDs(filePath){
    let buffer
    try {
        buffer = fs.readFileSync(filePath);
    } catch (error) {
        console.log("no compressed file")
        return
    }

    const decompressed = zlib.gunzipSync(buffer);

    const data = decompressed.toString();

    const dataArray = data.split('\n');

    var IDs = []
    dataArray.forEach(dataString => {
        try {
            const id = JSON.parse(dataString).id
            IDs.push(id)
        } catch (error) {
            // console.log(dataString)
        }
    });

    return IDs
}

function getLastWeekMonday(){
    const date = new Date();

    // Set the date to the previous Monday
    date.setDate(date.getDate() - date.getDay() - 2);
    
    // Format the date as a string
    return `${("0" + (date.getMonth() + 1)).slice(-2)}_${("0" + date.getDate()).slice(-2)}_${date.getFullYear()}`;
}