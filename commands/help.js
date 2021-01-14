// Dependencies
let Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    execute(client, message){
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have enough permissions to use this command.');
        const hlep = message.content.split(' ')[1];
        if (hlep === 'giveaway') {
            const embed = new Discord.MessageEmbed()
            .setColor(generateHex())
            .setTitle('HELP')
            .setDescription(`${prefix}giveaway [time] [image url] [nagroda]`)
            .setFooter(text: 'roBOT', url: 'https://cdn.discordapp.com/avatars/763438996675362877/66735ddd7027d87ed9690ea642aced20.png?size=256')
            message.channel.send(embed);
            }
        }
    }
}
