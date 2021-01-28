const Discord = require('discord.js');
const client = new Discord.Client();
let fs = require('fs');
const { prefix, token } = require('./config.json');

const config = require('./config.json');
const size = config.colors;
const rainbow = new Array(size);

for (var i = 0; i < size; i++) {
  var red = sin_to_hex(i, 0 * Math.PI * 2 / 3);
  var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3);
  var green = sin_to_hex(i, 2 * Math.PI * 2 / 3);

  rainbow[i] = '#' + red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? '0' + hex : hex;
}

let place = 0;
const servers = config.servers;

function changeColor() {
  for (let index = 0; index < servers.length; ++index) {
      let server = client.guilds.cache.get(servers[index]);
      if (!server) {
          if (config.logging) {
              console.log(`[ColorChanger] Server ${servers[index]} was not found. Skipping.`);
          }
          continue;
      }

      let role = server.roles.cache.find(r => r.name === config.roleName);
      if (!role) {
          if (config.logging) {
              console.log(`[ColorChanger] The role ${config.roleName} was not found on the server ${servers[index]}. Skipping.`);
          }
          continue;
      }

      role.setColor(rainbow[place]).catch(console.error);

      if (config.logging) {
          console.log(`[ColorChanger] Changed color to ${rainbow[place]} in server: ${servers[index]}`);
      }
  }

  if (place == (size - 1)) {
      place = 0;
  } else {
      place++;
  }
}


const activity = [
  "Push wiadomości na discordzie, by mieć lepszy lvl w MEE6",
  "Jak spadłeś z łóżka i zostałeś Supermanem część 1.",
  "#Hot16Świrek",
  "Tak zajebistej, że nawet nie musisz znać jej nazwy!"
]

const activ = [
  "STREAMING",
  "WATCHING",
  "LISTENING",
  "PLAYING"
]

client.on('ready', () => {
  console.log(`Bot tag: ${client.user.tag}`);
  console.log(`Guilds: ${client.guilds.cache.size}`);

  let i = 0;
  setInterval(() => {
    const index = Math.floor(i)
    client.user.setActivity(activity[index], { type: activ[index]});
    i = i + 1;
    if(i === activity.length) i = i - activity.length;
  }, 60000);
  
  setInterval(changeColor, config.speed);
  changeColor();
});

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.on('message', async message => {
  if (message.content.startsWith(`${prefix}`)) {
    let file_name = `${message.content.split(' ')[0].replace(prefix, '')}.js`;
    if(!fs.existsSync('./commands/' + file_name)) return undefined;
    if(fs.existsSync('./commands/' + file_name)) {
      client.commands.get(file_name.replace('.js', '')).execute(client, message);
    }
  }
});

client.login(process.env.TOKEN_BOT);
