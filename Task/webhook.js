'use strict';

const port = 4000

const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json()); // creates http server
// const config = require('../config');
const clc = require("cli-color");
// const randomPrefix = require('../Functions/assets/randomPrefix');

const authorizedOrigins = require(__basedir + '/.env/webhook.js').origins

module.exports = _ => {
    // const app = express();
    app.use(express.static(__dirname, { dotfiles: 'allow' } ));

    app.listen(port, () => {
        if(config.beta){
            console.log(`${clc.green('Webhook')} listening`)
        }else{
            console.log(`Webhook listening`)
        }
    });

    app.get('/', async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", "Content-Type");

        var response
        
        if(!authorizedOrigins.includes(req.headers.origin)){
            response = {error : 'you are not authorized'};
        }else{
            // response = await fun.apiQuery(req.query)
            response = await api.query(req.query)
        }

        res.send(response)
    });
    
    app.post('/', async (req, res) => {
        // console.log(req.body)
        if (req.query.token !== config.webhookToken) {
            // console.log('bad token')
            return res.sendStatus(401);
        }
        
        res.send('received')

        if(!req.body) return

        if(req.body.type == 'upvote'){
            const userID = req.body.user
            

            const user = await fun.getUser(userID)

            var userText = 'Unknown user'
            if(user){
                fun.voted(userID)
                userText = `${user.username}#${user.discriminator}`
            } 
            console.log(`${userText} has voted`)
        }

    });
}



