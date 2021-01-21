const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./utility/util");

const Discord = require('discord.js');
const client = new Client();

client.login(TOKEN)
client.commands = new Collection();

// const botCommands = require('./commands/ping');

// Object.keys(botCommands).map(key => {
//   client.commands.set(botCommands[key].name, botCommands[key]);
// });

client.once('ready', () =>{
    console.log(`${client.user.username} ready!`);
    client.user.setActivity(`${PREFIX}help and ${PREFIX}play`, { type: "LISTENING" });
});

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});

/**
 * Import all commands
 */
