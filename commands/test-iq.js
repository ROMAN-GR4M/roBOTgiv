let Discord = require('discord.js');
const { prefix } = require('../config.json');

function Random() {
    let r = Math.floor(Math.random() * 102);
    if(r == 101){
        return 200;
    }else return r;
};
function generateHex() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
const email = client.user.email;
module.exports = {
    name: 'test-iq',
    description: 'siema',
        execute(client, message) {
            if(message.content === `${prefix}test-iq`){
            const embed = new Discord.MessageEmbed()
            .setColor(generateHex())
            .setTitle('TEST IQ')
            .setDescription(`${email} posiada **`+Random()+` IQ**`)
            .setFooter('Bot ma zawsze rację')
            .setThumbnail(message.author.avatarURL())
            .setTimestamp();
            message.channel.send(embed);
        }
    }
}