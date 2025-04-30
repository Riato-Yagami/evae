const emo = table.emoji
// date : MM/DD/YYYY
module.exports = {
    logs : [
        {
            date : '08/30/2023',
            version : '4.2.2',
            dscr: 'minor fixes after vacations',
            fixed : [
                { name : `player username fixed on assets' histories` },
            ],
        },
        {
            date : '07/22/2023',
            version : '4.2.1',
            dscr: 'minor fixes before going on vacation',
            fixed : [
                { name : `/rollsettings (really this time I hope)` },
                { name : `/daytop and /dayresume` },
                { name : `external user's emoji ${emojies.externalUser}` },
            ],
        },
        {
            date : '07/15/2023',
            version : '4.2',
            dscr: 'minor fixes and filters on website',
            fixed : [
                { name : `/rollsettings` },
                { name : `roll notifications` },
                { name : `vote notifications` },
            ],
            added : [
                { name : `You can now filter off assets in your Website collection https://juels.dev/evae/assets`},
            ]
        },
        {
            date : '06/22/2023',
            version : '4.1.1',
            dscr: 'web site changes',
            fixed : [
                { name : `Top gg vote reward` },
                { name : `Assets /powerup` },
                { name : `Website exploit for claiming assets rolled a while ago by kepping multiple open tabs` },
            ],
            changed : [
                { name : `Last roll is stored on website reload`},
            ]
        },
        {
            date : '06/19/2023',
            version : '4.1.0',
            dscr: 'ACTUALLY PLAYABLE WEBAPP!?',
            fixed : [
                { name : `Things related to the new discord username update.` },
            ],
            added : [
                { name : `Start collecting assets right now on https://juels.dev/evae/roll !!`},
                { name : `Review your collection on https://juels.dev/evae/assets`}
            ]
        },
        {
            date : '06/09/2023',
            version : '4.0.2',
            dscr: 'Fixed some things?',
            fixed : [
                { name : `I think i fixed a bug with the power button, maybe?` },
                { name : `And a problem with private messages probably.` }
            ],
            changed : [
                { name : `You can now connect to https://juels.dev/evae/ it doesn't have any real purpose right now, but soon it will!!`}
            ]
        },
        {
            date : '06/06/2023',
            version : '4.0.1',
            dscr: 'ARRRG FIXES Update',
            fixed : [
                { name : `A lot of things broken by verification` }
            ],
            changed : [
                { name : `Needed assets for attacks , trades and challenge are now imputed using modals` }
            ]
        },
        {
            date : '05/30/2023',
            version : '4.0.0',
            dscr: 'LEVEL UP UPDATE',
            added: [
                { name : `Click the ${emojies.power} button that will appear once e in a while during rolls to gain power to add to your power bank ${emojies.power}${emojies.bank}`},
                { name : `use /powerup to increase your assets powers using your ${emojies.power}${emojies.bank}`},
                { name : `use /profile to see how much you have in your ${emojies.power}${emojies.bank}`},
            ]
        },
        {
            date : '05/19/2023',
            version : '3.0.1',
            dscr: 'ACTUALLY play Evaé from **web browser** now !!',
            fixed: [
                { name : 'Everything added in 3.0.0 haha, play it here : https://juels.dev/evae/play' },
            ]
        },
        {
            date : '05/14/2023',
            version : '3.0.0',
            dscr: 'PLAY Evaé from **web browser** now !!',
            added: [
                { name : 'You can perform rolls directly from your web browser at **https://juels.dev/evae/play**.'
            +'\nFor now, only rolling is possible, but in the future you might be able to build your collection from there.'}
            ],
            fixed: [
                { name : 'Fixed a bug with fandom article title.' },
            ]
        },
        {
            date : '05/06/2023',
            version : '2.3.2',
            dscr: 'On the way to the verification !!',
            added: [
                { name : 'Evaé now has a website ! https://juels.dev/evae/'
            +'\nThere is not much on there as of now, but you can access Evaé Privacy policy and terms of service from it'
            +'\nThings are planned for this site, so keep an eye out !' },
            ],
            changed: [
                { name : 'NSFW content can\'t be rolled anymore due to discord restriction' },
                { name : 'You may search for NSFW using /search but only in NSFW #channels and is NSFW is enabled on your server with /setnsfw' },
            ],
            fixed: [
                { name : 'Fixed a bug causing trade failure' },
                { name : 'Fixed some text in challenge/trade/gift' },
            ]
        },
        {
            date : '04/27/2023',
            version : '2.3.1',
            dscr: 'bug report',
            added: [
                { name : 'use /bugreport if you come across something you think is a bug using Evaé' },
                { name : 'Top.gg now updates the count of connected servers every hour to display the most recent information' },
            ]
        },
        {
            date : '04/23/2023',
            version : '2.3.0',
            dscr: 'Notifications',
            added: [
                { name : 'get notified when your rolls get reset with /notification roll: true' },
                { name : 'get notified when your vote cool down ended with /notification vote: true' },
            ],
            changed:
            [
                { name : 'changed battle/attack/challenge/trade/gift embeds color' },
            ],
            fixed:
            [
                { name : 'issues with music assets' },
                { name : 'error when choosing an emoji as a fandom tag' },
                { name : 'corrected update dates again... (why do americans invert days and months 😭)' },
            ],
        },
        {
            date : '04/21/2023',
            version : '2.2.0',
            dscr: 'UPDATE update',
            added: [
                { name : 'get notified by private message whenever there is a new update for Evaé with /notification update: true' },
            ],
            fixed:
            [
                { name : 'a bunch of issues related to leaving servers' },
                { name : 'corrected precedent update dates' },
            ],
            changed:
            [
                { name : 'you can now enter the category tag in capital letter if you wish' },
            ],
        },
        {
            date : '04/11/2023',
            version : '2.1.1',
            dscr: 'Special queues',
            added: [
                { name : 'added special roll queues for server using different language and different fandoms' },
                { name : 'server count is now instantly updated when a new server joins' },
            ],
            fixed:
            [
                { name : 'error with private messages' },
                { name : 'multiple errors concerning music parsing' },
            ],
            changed:
            [
                { name : 'buffed wikis' },
            ],
        },
        {
            date : '04/09/2023',
            version : '2.1.0',
            dscr: 'Statistocs',
            added: [
                { name : 'use /profile display more info like server joined or user on server' },
                { name : 'Evaé display how many server are connected and the amount of evaé users on these servers in its description' },
            ],
            fixed:
            [
                { name : 'FOREVER AND EVER CRASHING NIGHTMARE' },
                { name : '/profile error when lossed a profile asset again' },
            ],
        },
        {
            date : '04/05/2023',
            version : '2.0.0',
            dscr: `**SERVER CUSTOMIZATION** and revamped ${emo.fandom} fandoms !! `,
            added: [
                { name : 'as an admin use /rollsettings to enable or disable specific categories and fandom from global rolls.' 
            + '\nFor now choosing specific fandom will slow down your rolls a bit but this will be improved in the near future !'},
            ],
            changed:
            [
                { name : `fandom have been revamped, no more crappy one of character page !`
            + `\nThere are some more change, for example if you roll something like **${emo.fandom} Joey /friends/** you will now get the real page **${emo.fandom} Joey Tribbiani /friends/** instead`
            + `\nSadly, that means that I had to **delete the old database**, do your fandom assets must be all empty`
            + `\nBut they are not all lost if you have had "real page" (not redirects) **you still own theme** ! They just have to be rolled again by someone on any server or the be searched to appear again in your assets`
            + `\n**Truly lost pages** (redirects) won't appear again though, but I'm planning on giving you **something in return** in a future update !! (I still have access to every assets IDs that you owned)`  },
                { name : 'voting now get you +9 rolls instead of +1 claim 1 time out ouf 2' },
            ],
            fixed:
            [
                { name : 'performance improvement' },
                { name : 'quite a lot of asset display stuff crashing Evaé' },
            ],
        },
        {
            date : '03/30/2023',
            version : '1.2.2',
            dscr: 'STATTSS',
            added: [
                { name : 'use /profile to get your stats across server with -global: true' },
                { name : 'use /profile to get your server profile with -server: true' },
                { name : 'use /profile to get the bot stats with -bot: true' },
            ],
            changed:
            [
                { name : '/profile asset is now displayed like a regular asset and user pfp is always as thumbnail' },
            ],
            fixed:
            [
                { name : '/profile error when lossed a profile asset' },
            ],
        },
        {
            date : '03/28/2023',
            version : '1.2.1',
            dscr: 'Flex Update',
            added: [
                { name : '/profile to see your global advancement on Evaé' },
                { name : '/profilesettings you can add one of your asset to be diplayed with your assets' }
            ],
        },
        {
            date : '03/24/2023',
            version : '1.2.0',
            dscr: 'Inter server stuff',
            added: [
                { name : 'with /daytop get the best assets of each category collected today in Evaé across all servers !' }
            ],
        },
        {
            date : '03/21/2023',
            version : '1.1.1',
            dscr: 'NSFW 🔞 update',
            added: [
                { name : '/setnsfw' },
                { name : 'enable or disable NSFW 🔞 content on your server' }
            ],
            fixed: [
                { name : `long user or server name causing crash` }
            ]
        },
        {
            date : '03/18/2023',
            version : '1.1.0',
            dscr: 'Vote for Evaé and earn free claims',
            added: [
                { name : '/vote' },
                { name : 'command printed in messages are now clickable' }
            ],
            fixed: [
                { name : `fandom illustration selecting explore wiki images` }
            ]
        },
        {
            date : '03/10/2023',
            version : '1.0.2',
            dscr: 'Pretty Update',
            added: [
                { name : 'with /assets choose between 0 and 4 image to display' },
                { name : "with /assets choose whether to display or not assets' text" },
            ],
            fixed: [
                { name : `duplication glitch` },
                { name : `permission shenanigans` },
            ]
        },
        {
            date : '03/08/2023',
            version : '1.0.1',
            dscr: 'New command for beginners',
            added: [
                { name : '/hlp' },
            ],
            changed: [
                { name : `server language now affects some text` },
                { name : `buffed songs ${emo.music}` },
                { name : `rebalanced fandoms ${emo.fandom}` },
                { name : `if not already, fandoms ${emo.fandom} are now added with rolls and searches as well as /addfandom` },
            ],
            fixed: [
                { name : `typos` },
                { name : `SQL large value error` },
                { name : `log description` },
                { name : `crash caused by some Pokémon TCG missing prices` },
                { name : `crash caused by asset display during an attack` },
                { name : `crash caused by missing bot permissions` },
            ]
        },
        {
            date : '03/02/2023',
            version : '1.0',
            dscr: 'The release of Evaé !',
            added: [
                {
                    name : '/ping'
                },
                {
                    name : '/roll'
                },
                {
                    name : '/search'
                },
                {
                    name : '/assets'
                },
                {
                    name : '/letgo'
                },
                {
                    name : '/trade'
                },
                {
                    name : '/challenge'
                },
                {
                    name : '/setlang'
                },
                {
                    name : '/rollinfo'
                },
                {
                    name : '/give'
                },
                {
                    name : '/help'
                },
                {
                    name : '/calendar'
                },
                {
                    name : '/fandom'
                },
                {
                    name : '/addfandom'
                },
                {
                    name : '/dayresume'
                },
                {
                    name : '/about'
                },
                {
                    name : '/support'
                },
                {
                    name : '/changelog'
                }
            ]
        }
    ]
}