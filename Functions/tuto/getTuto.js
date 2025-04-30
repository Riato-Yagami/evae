const pages = [{
    objectives : [
        {
            dscr : 'Use /roll ',
            objective : { command : 'roll' }
        },
        {
            dscr : 'Claim a rolled asset',
            objective : { command : 'assets',
                args : [{name : 'type'},
                    {name : 'image', value: false}
                ]
            }
        }
    ],
    reward : 'roll'
}]

module.exports = async (message) => {
    var i = 0

    var page = pages[i]
    page.page = i + 1
    page.tutoLength = pages.length
    return page
}