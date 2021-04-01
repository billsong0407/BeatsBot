const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./utility/util");

const Discord = require('discord.js');
const client = new Client();

client.login(TOKEN);
client.commands = new Collection();
client.servers = new Map();

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  if (command.name)
    client.commands.set(`${PREFIX}${command.name}`, command);
}

client.once('ready', () =>{
    console.log(`BeatsBot is online!`);
    client.user.setActivity(`${PREFIX}help and ${PREFIX}play`, { type: "LISTENING" });
});

client.on('message', async(msg) => {
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);
  
  if (!client.commands.has(command)) return msg.reply('Command not found!');

  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('There was an error trying to execute that command!');
  }
});
