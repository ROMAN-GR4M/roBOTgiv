let Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'giveaway',
    execute(client, message){
        client.on('message', (message) => {
            const ms = require('ms'); // npm install ms
            const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
        
            if (command === 'start-giveaway') {
                // g!start-giveaway 2d 1 Awesome prize!
                // will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
        
                client.giveawaysManager.start(message.channel, {
                    time: ms(args[0]),
                    prize: args.slice(2).join(' '),
                    winnerCount: parseInt(args[1])
                }).then((gData) => {
                    console.log(gData); // {...} (messageid, end date and more)
                });
                // And the giveaway has started!
            }
        });
    }
}