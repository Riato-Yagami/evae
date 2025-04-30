module.exports = {
    dBParser : {
        film: require(__basedir + "/Functions/parse/query/parseAssetDb/parseFilmDb"), 
        game: require(__basedir + "/Functions/parse/query/parseAssetDb/parseGameDb"),
        music: require(__basedir + "/Functions/parse/query/parseAssetDb/parseMusicDb"),
        poke: require(__basedir + "/Functions/parse/query/parseAssetDb/parsePokeDb"),
        wiki: require(__basedir + "/Functions/parse/query/parseAssetDb/parseWikiDb"),
        fandom: require(__basedir + "/Functions/parse/query/parseAssetDb/parseFandomDb"),
    },
    
    queryParser : {
        film: require(__basedir + "/Functions/parse/query/parseAssetQuery/parseFilmQuery"), 
        game: require(__basedir + "/Functions/parse/query/parseAssetQuery/parseGameQuery"),
        music: require(__basedir + "/Functions/parse/query/parseAssetQuery/parseMusicQuery"),
        poke: require(__basedir + "/Functions/parse/query/parseAssetQuery/parsePokeQuery"),
        wiki: require(__basedir + "/Functions/parse/query/parseAssetQuery/parseWikiQuery"),
        fandom: require(__basedir + "/Functions/parse/query/parseAssetQuery/parseFandomQuery"),
    },
    
    search : {
        film: require(__basedir + "/Functions/search/searchFilm"), 
        game: require(__basedir + "/Functions/search/searchGame"), 
        music: require(__basedir + "/Functions/search/searchMusic"), 
        poke: require(__basedir + "/Functions/search/searchPoke"), 
        wiki: require(__basedir + "/Functions/search/searchWiki"), 
        fandom: require(__basedir + "/Functions/search/searchFandom"), 
    },

    roll : {
        film: require(__basedir + "/Functions/roll/rollFilm"), 
        game: require(__basedir + "/Functions/roll/rollGame"), 
        music: require(__basedir + "/Functions/roll/rollMusic"), 
        poke: require(__basedir + "/Functions/roll/rollPoke"), 
        wiki: require(__basedir + "/Functions/roll/rollWiki"), 
        fandom: require(__basedir + "/Functions/roll/rollFandom"), 
    },

    embed : {
        film: require(__basedir + "/Functions/embed/assetEmbed/buildFilmEmbed"), 
        game: require(__basedir + "/Functions/embed/assetEmbed/buildGameEmbed"), 
        music: require(__basedir + "/Functions/embed/assetEmbed/buildMusicEmbed"), 
        poke: require(__basedir + "/Functions/embed/assetEmbed/buildPokeEmbed"), 
        wiki: require(__basedir + "/Functions/embed/assetEmbed/buildWikiEmbed"), 
        fandom: require(__basedir + "/Functions/embed/assetEmbed/buildFandomEmbed"), 
    },
}