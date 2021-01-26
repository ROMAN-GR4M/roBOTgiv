let Discord = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: 'rainbow',
    description: 'siema',
        execute(client, message) {
            if(message.content === `${prefix}rainbow`){
                if(!message.guild) return;
                if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) return;
                message.guild.roles.cache.find(role => role.name === "Admin");
                    role.edit({
                        color: '#8585ff'
                    })
              }
            }
        }
    }
