const { EmbedBuilder } = require('discord.js');
const aCol = require(__basedir + "/botSettings/action").color

const aEmo = '🟥'
const dEmo = '🟦'
const rEmo = '🟨'
const powerDisplaySize = 14

module.exports = async ( message, channel, assailant , defender, aAsset, dAsset) => {
    
    var aTitle = 'assets'
    var dTitle = 'assets'

    // console.log(typeof aAsset)

    if(typeof aAsset != 'number'){
        aTitle = fun.parseTitle(aAsset, true, false, false)
        dTitle = fun.parseTitle(dAsset, true, false, false)
    }

    var aPower = aAsset
    var dPower = dAsset

    if(dAsset.power){ //meaning we are in an attack because there is only one asset at hand
        dPower = fun.getScaledPower(aAsset,dAsset)
        aPower = aAsset.power + aAsset.powerUp
    }

    const totalPower = aPower + dPower

    var aPowerDisplayCount = diplayPos(aPower, totalPower)
    var dPowerDisplayCount = diplayPos(dPower, totalPower)
    
    // console.log([aPowerDisplayCount,dPowerDisplayCount])
    aPowerDisplayCount += powerDisplaySize ** 2 - (aPowerDisplayCount + dPowerDisplayCount)

    const aPowerDisplay = aEmo.repeat(aPowerDisplayCount)
    const dPowerDisplay = dEmo.repeat(dPowerDisplayCount)

    var powerLine = aPowerDisplay + dPowerDisplay
    // console.log(powerLine.length)

    var powerGrid = buildPowerGrid(powerDisplaySize, powerLine)

    // const alternativeDisplay = `\`\`\`${powerGrid}\`\`\``
    var battleEmbed = new EmbedBuilder()
        .setTitle(`${aEmo} ${assailant.username}'s ${aTitle} - ${fun.parseNumber(aPower)} ${emojies.power}` + 
    `\nvs ${dEmo} ${defender.username}'s ${dTitle} - ${fun.parseNumber(dPower)} ${emojies.power}`)
        .setDescription(powerGrid)
        .setColor(aCol.attack)


    return new Promise(async (resolve, reject) => {

        let reply = await fun.followUp(message,{ embeds: [battleEmbed]})

        await battleAnimation(totalPower,powerLine,battleEmbed,reply)
        const randomPower = fun.randomInt(0,totalPower)
        rdPos = diplayPos(randomPower, totalPower)
        var powerGrid = buildPowerGrid(powerDisplaySize, powerLine, rdPos)

        var winner
        var wTitle
        if(randomPower > aPower){
            winner = defender ; wTitle = dTitle
        }else{
            winner = assailant ; wTitle = aTitle
        }

        battleEmbed
            .setDescription(powerGrid)
            .setFooter({text: `${winner.username}'s ${wTitle.replace(/\**/g,'')} WON !`, iconURL: winner.displayAvatarURL()})

        reply.edit({ embeds: [battleEmbed]})

        resolve(winner)
        return
    })
}

function diplayPos(power, totalPower){
    return Math.floor(power * powerDisplaySize ** 2 / totalPower)
}

function buildPowerGrid(powerDisplaySize, powerLine, rd){
    if(rd) rd*=2
    var powerGrid = ''
    const lSize = powerDisplaySize * 2
    for (let index = 0; index < powerDisplaySize; index++) {
        var line = powerLine.substring(index * lSize, index * lSize + lSize);
        if(rd){
            if(index * lSize <= rd && rd < index * lSize + lSize){
                rdlinePos = rd - index * lSize
                line = line.substr(0, rdlinePos) + rEmo + line.substr(rdlinePos + 1)
            }
        }
        powerGrid += `${line}\n`
    }

    return powerGrid
}

async function battleAnimation(totalPower,powerLine,battleEmbed,reply){
    await sleep(750)
    for (let index = 0; index < 3; index++) {
        
        const randomPower = fun.randomInt(0,totalPower)
        rdPos = diplayPos(randomPower, totalPower)
        var powerGrid = buildPowerGrid(powerDisplaySize, powerLine, rdPos)
        battleEmbed.setDescription(powerGrid)
        reply.edit({ embeds: [battleEmbed]})
        await sleep(750)
    }
    await sleep(150)
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}