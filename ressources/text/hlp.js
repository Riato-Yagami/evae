const emo = table.emoji
const aEmo = require(__basedir + "/botSettings/action").emoji

module.exports = {
    en:{
        title : `Getting started with **Evaé**`,
        dscr : `With **Evaé** you can **collect**:`
        + `\n`
        + ` ${emo.wiki} *wikipedia articles*,`
        + ` ${emo.film} *movies*, `
        + ` ${emo.game} *games*, `
        + ` ${emo.music} *songs*, `
        + ` ${emo.fandom} *fandom pages* `
        + ` and ${emo.poke} *Pokémon TCG* !`
        + `\n\n`
        + `Start collecting asset by using **/roll** and pressing ${aEmo.claim} if you like what you see.`
        + `\n`
        + `You get **9 rolls** and **1 claim** **per hour**, so use them wisely.`
        + `\n\n`
        + `You can review your collection with **/assets** and even trade theme with other players !`
        + `\n\n`
        + `There is much more to learn about Evaé use **/help** if you want a complete guide !`
    },
    fr:{
        title : `Bien commencer avec **Evaé**`,
        dscr : `Avec **Evaé** vous pourrez **collecter**:`
        + `\n`
        + ` des *articles wikipedia* ${emo.wiki},`
        + ` *films* ${emo.film}, `
        + ` *jeux* ${emo.game}, `
        + ` *musiques* ${emo.music}, `
        + ` *pages fandoms* ${emo.fandom}`
        + ` et des *cartes Pokémon* ${emo.poke} !`
        + `\n\n`
        + `Commence à récupérer des assets en utilisant **/roll**, si tu vois quelques que chose qui te plaît ajoute l'à ta collection en appuyant sur le bouton ${aEmo.claim}`
        + `\n`
        + `Tu as **9 rolls** et **1 claim** par heur alors utilise les à bon escient.`
        + `\n\n`
        + `Tu peux visionner ta collection avec **/assets** et meme échanger avec les autres joueurs !`
        + `\n\n`
        + `Il y a encore bien plus à apprendre sur mudae ! Fait **/help** si tu veux en apprendre plus sur les différentes commandes disponibles.`
    }
    
}