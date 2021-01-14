let Discord = require('discord.js');
const { prefix } = require('../config.json');

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

module.exports = {
    name: 'giveaway',
    execute(client, message){
        if (!message.guild) return;
        async function giveaway() {
            var time = '';
            var time2 = '';
            var time3 = '';
            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have enough permissions to use this command.');
            if (message.content === `${prefix}giveaway`) return message.channel.send(`Nie podałeś czasu trwania giveaway!`)
            if (message.content !== `${prefix}giveaway`) {
                const stated_duration_hours = message.content.split(' ')[1];
                const stated_duration_hours2 = stated_duration_hours.toLowerCase();
                if (stated_duration_hours2.includes('s')) {
                    var time = 's';
                }
                if (stated_duration_hours2.includes('m')) {
                    var time = 'm';
                }
                if (stated_duration_hours2.includes('h')) {
                    var time = 'h';
                }
                if (stated_duration_hours2.includes('d')) {
                    var time = 'd';
                }
                const stated_duration_hours3 = stated_duration_hours2.replace(time, '');
                if (stated_duration_hours3 === '0') {
                    message.channel.send('The duration has to be atleast one.');
                }
                if (isNaN(stated_duration_hours3)) {
                    message.channel.send('The duration has to be a valid time variable.');
                }
                if (stated_duration_hours3 > 1) {
                    var time3 = 's';
                }
                if (time === 's') {
                    var actual_duration_hours = stated_duration_hours3 * 1000;
                    var time2 = 'second';
                }
                if (time === 'm') {
                    var actual_duration_hours = stated_duration_hours3 * 60000;
                    var time2 = 'minute';
                }
                if (time === 'h') {
                    var actual_duration_hours = stated_duration_hours3 * 3600000;
                    var time2 = 'hour';
                }
                if (time === 'd') {
                    var actual_duration_hours = stated_duration_hours3 * 86400000;
                    var time2 = 'day';
                }
                if (!isNaN(stated_duration_hours3)) {
                    const photo = message.content.split(' ')[2];
                    if (photo === '') return message.channel.send('Nie podałeś linku do zdjęcia!');
                    const pdata = message.content.split(' ')[3];
                    if (pdata === '') return message.channel.send('Nie podałeś daty zakończenia!');
                    const times = message.content.split(' ')[4];
                    if (times === '') return message.channel.send('Nie podałeś daty zakończenia!');
                    const prize = message.content.split(' ').slice(5).join(' ');
                    if (prize === '') return message.channel.send('Nie podałeś nagrody!');
                    if (stated_duration_hours3 !== '0') {
                        const embed = new Discord.MessageEmbed()
                        .setTitle(`${prize}`)
                        .setColor('e74c3c')
                        .setDescription(`Kliknij w reakcje 👍 i wygraj ${prize}!\n\n `+"`Giveaway kończy się: ${pdata} ${times}`")
                        .addField(timeConverter(Date.now() + (actual_duration_hours)))
						.setImage(photo)
                        .setFooter(`Utworzony przez ${message.author.username}`)
                        let msg = await message.channel.send(embed)
                        await msg.react('👍')

                        setTimeout(() => {
                            msg.reactions.cache.get('👍').users.remove(client.user.id)
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
                        }, actual_duration_hours);
                    }
                }
            }
        }
        giveaway();
    }
}
