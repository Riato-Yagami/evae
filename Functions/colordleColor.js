const seedrandom = require('seedrandom');

module.exports = date =>{
    colorToGuess = getSeededColor(getDateDiff(date))
    // console.log(colorToGuess)
    return colorToGuess
}

function getSeededColor(seed){
    const newColor = [getSeededColorValue(seed + "red"),
    getSeededColorValue(seed + "green"),
    getSeededColorValue(seed + "blue")];
    return newColor;
}

function getSeededColorValue(seed){
    var seededValue = seedrandom(seed);
    var value = Math.floor(seededValue()*256);
    //console.log(value);
    return value;
}

function getDateDiff(date = new Date()){
    // const date ;
    const firstDate = new Date('2022-10-20 00:00:00');

    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();

    currentDate = `${year}-${month}-${day}`;
    const utc = new Date(`${currentDate} 00:00:00`);
    let diff = dateDiff(firstDate,utc);

    return diff.day;
}

function dateDiff(date1, date2){
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;
     
    return diff;
}