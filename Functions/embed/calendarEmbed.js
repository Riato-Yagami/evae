const { EmbedBuilder } = require('discord.js');

const aEmo = require(__basedir + "/botSettings/action").emoji
const dEmo = require(__basedir + "/botSettings/day").emoji

module.exports = async (message) => {
    const calendar = await getCalendar(message,new Date())

    const calendarEmbed = buildCalendarEmbed(calendar)

    fun.reply(message,{embeds : [calendarEmbed]})
}

async function getCalendar(message,date) {
    const monday = getMonday(date)
    // console.log(monday.getDate())
    var calendar = []

    for (let i = 0; i < 10; i++) {
        var newDay = new Date(monday)
        newDay.setDate(monday.getDate() + i)
        const formatedDate = await fun.parseDate(message, newDay, false, null, true)
        // fun.parseDate(newDay)
        var day = {
            date : newDay,
            str : formatedDate,
            state : await fun.getDayState(message,newDay)
        }

        calendar.push(day)
    }

    return calendar

}

function getMonday(d){
    const dt = new Date(d);
    const day = dt.getDay()
    const diff = dt.getDate() - day + (day === 0 ? -6 : 1);
    var monday = new Date(dt.setDate(diff))
    return monday;
}

const description = 
  `${dEmo.peace} > ${aEmo.gift} & ${aEmo.trade}   `
+ `${dEmo.neutral} > ${aEmo.trade} & ${aEmo.challenge}\n`
+ `${dEmo.tense} > ${aEmo.challenge}             `
+ `${dEmo.war} > ${aEmo.challenge} & ${aEmo.attack}`

function buildCalendarEmbed(calendar){
    str = ''
    calendar.forEach(day => {
        const today = day.date.getDate() == new Date().getDate()
        str += 
        // `${(today)? '   ' : ''}`
        `${getEmo(day.state)} ${day.str}`
        +`${(today)? ' 👈' : ''}\n`
    });

    str = `\`\`\`css`
    +`\n${str}`
    +`\`\`\``
    // +`\`\`\`css`
    // +`\n${description}`
    // +`\`\`\``

    let embed = new EmbedBuilder()
        // .setTitle('Calendar')
        .setColor([244,144,12])
        .setDescription(str)
        .setFooter({text :description})

    return embed
}

function getEmo(state){
    var emo = dEmo.peace
    switch (state) {
        case 'war':
            emo = dEmo.war
            break;
        case 'tense':
            emo = dEmo.tense
            break;
        case 'neutral':
            emo = dEmo.neutral
            break;
    }

    return emo
}