const maxReload = 10

module.exports = async _ => {
    // console.log(message)
    let IDs = await fun.queryFilmIDs()
    if(!IDs) return

    const index = randomId(IDs.length)
    const ID = IDs[index]
    // console.log(ID)
    return(tryID(IDs,ID, 0))
}

function randomId(max)
{
    const ID = Math.floor(Math.random() * Math.floor(max))
    // console.log(ID)
    return ID;
}


async function tryID(IDs, ID, reload, bestMovie){
    let film = await fun.queryFilmByID(ID)
    if(!film) return

    if(bestMovie == null || film.popularity > bestMovie.popularity && film.poster_path != null){
        bestMovie = film
    }

    if(reload < maxReload){
        return tryID(IDs, IDs[randomId(IDs.length)], reload + 1, bestMovie)
    }

    if(bestMovie.poster_path == null){ 
        // console.log(`${body.original_title} has no poster`)
        // console.log(`MoviRELOAD ${clc.yellow(reload)}`)
        return tryID(IDs, IDs[randomId(IDs.length)],reload+1)
    }

    return bestMovie
}

