let Discord = require('discord.js');
const { prefix } = require('../config.json');

const embed = new Discord.MessageEmbed()
    .setTitle('Ojojoj, chyba nie masz uprawnień')
    .setDescription(`${message.author} próbował zbanować ${mentions.user}`)
    .setTimestamp();
const embed1 = new Discord.MessageEmbed()
    .setTitle(`Poleciał BAN`)
    .setDescription(`${toBan} został zbanowany!\nPowód: ${reason}`)
    .setTimestamp();

module.exports = {
    name: 'ban',
    description: 'siema',
        execute(client, message) {
            const { member, mentions } = message

            let toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]);

            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embed) 
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Bot need permissions!") 

            const reason = args[1] || " ";

            toBan.ban({
                reason: reason
            })
            message.channel.send(embed1)
        }
    }
