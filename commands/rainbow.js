let Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'rainbow',
    description: 'siema',
        execute(client, message) {
            if(message.content === prefix+'rainbow'){
                if(!message.guild) return;
                if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) return;
                let colors = ['#8585ff','#fff681','#a073fd','#fd73b9'];
                for(let i = 0; i<= colors.length;i++){
                let role = message.guild.roles.find(role => role.name === "rolename");
                setInterval(() => {
                    role.edit({
                        color: colors[i]
                    })
                }, 20000);
              }
            }
        }
    }
