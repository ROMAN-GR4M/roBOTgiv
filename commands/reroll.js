let Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'reroll',
    execute(client, message){

        setTimeout(() => {
            let winner = msg.reactions.cache.get('👍').users.cache.random();
            if (msg.reactions.cache.get('👍').users.cache.size < 1) {
                const winner_embed = new Discord.MessageEmbed()
                .setTitle(`${prize}`)
                .setColor('36393F')
                .setDescription(`Brak reakcji pod giveaway'em`)
                message.channel.send(winner_embed);
            }
            if (!msg.reactions.cache.get('👍').users.cache.size < 1) {
                const winner_embed = new Discord.MessageEmbed()
                .setTitle(`**Ogłoszenie wyników**`)
                .setColor('c27c0e')
                .setDescription(`Giveaway o ***${prize}*** wygrał *${winner.tag}*\n**Gratulacje!**`)
                .setFooter(`Liczba uczestników - ${msg.reactions.cache.get('👍').count}`)
                message.channel.send(winner_embed);
                message.channel.send(`Prosimy ${winner} o odebranie nagrody od ${message.author}`)
            }
        }, 1000);
    }
}