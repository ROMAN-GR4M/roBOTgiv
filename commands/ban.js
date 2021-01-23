const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Kicks a member from the server",

    async run (client, message, args) {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('?')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Nie masz uprawnień, heh')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Nie wiem kogo zbanować');

        if(!member) return message.channel.send('Nie ma takiej osoby na tym serwerze');
        if(!member.bannable) return message.channel.send('Akurat jego nie moge zbanować, unlucky');

        if(member.id === message.author.id) return message.channel.send('Ale że serio? Chcesz się sam zbanować?');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Nie wiem, bo nie podali powodu, bruh';

        member.ban(`${reason}`)
        .catch(err => {
            if(err) return message.channel.send('No nie wiem czemu, ale jakiś błąd mam')
        })

        const banembed = new Discord.MessageEmbed()
        .setTitle('Member Banned')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Banned', member)
        .addField('Kicked by', message.author)
        .addField('Reason', reason)
        .setFooter('Time kicked', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banembed);


    }
}