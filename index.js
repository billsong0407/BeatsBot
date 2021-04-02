const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./utility/util");

const client = new Client();

client.login(TOKEN);
client.commands = new Collection();
client.servers = new Map();
cooldowns = new Collection();

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
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

client.on('message', async(msg) => {
  if (!msg.content.startsWith(PREFIX) || msg.author.bot || !msg.guild) return;

  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);
  
  if (!client.commands.has(command)) return msg.reply(' - ❌ Command not found!');

  let command_name = client.commands.get(command).name;
  let command_cooldown = client.commands.get(command).cooldown;
  let author_id = msg.author.id;

  if (!cooldowns.has(command_name)) {
    cooldowns.set(command_name, new Collection());
  }

  const now = Date.now();
  let timestamps = cooldowns.get(command_name);
  const cooldownAmount = (command_cooldown || 1) * 1000;

  if (command_name == "lyrictrivia" || command_name == "pictrivia"){
    command_name = "trivia";
    author_id = "universal";
    if (!cooldowns.has(command_name)) {
      cooldowns.set(command_name, new Collection());
    }
    timestamps = cooldowns.get(command_name);
  }

  if (timestamps.has(author_id)) {
    const expirationTime = timestamps.get(author_id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return msg.reply(
        ` - ⚠️ please wait for ${timeLeft.toFixed(1)} seconds before using the ${PREFIX}${client.commands.get(command).name} command again.`
      );
    }
  }

  timestamps.set(author_id, now);
  setTimeout(() => timestamps.delete(author_id), cooldownAmount);

  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply(' - ❌ There was an error trying to execute that command!');
  }
});
