let Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'giveaway',
    execute(client, message){
        client.on('message', (message) => {
            const ms = require('ms'); // npm install ms
            const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
        
            if (command === 'reroll') {
                let messageID = args[0];
                client.giveawaysManager.reroll(messageID).then(() => {
                    message.channel.send('Success! Giveaway rerolled!');
                }).catch((err) => {
                    message.channel.send('No giveaway found for ' + messageID + ', please check and try again');
                });
            }
        });
    }
}