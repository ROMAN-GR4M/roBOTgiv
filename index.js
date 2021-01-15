const Discord = require('discord.js');
const client = new Discord.Client();
let fs = require('fs');
const { prefix, token } = require('./config.json');

const activity = [
  "Pamiętaj, by świętować godzinę papieską!",
  "Jestem twoim Bogiem, rozumiesz?",
  "GrochuPay to legitna forma płatności",
  "Jestem zajebisty",
  "Grochu Raider",
]

client.on('ready', () => {
  console.log(`Bot tag: ${client.user.tag}`);
  console.log(`Guilds: ${client.guilds.cache.size}`);

  let i = 0;
  setInterval(() => {
    const index = Math.floor(i)
    client.user.setActivity(activity[index], { type: 'PLAYING'});
    i = i + 1;
    if(i === activity.length) i = i - activity.length;
  }, 5000);
  
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
