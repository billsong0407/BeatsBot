const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./utility/util");
const ytdl = require('ytdl-core');

const Discord = require('discord.js');
const client = new Client();

client.login(TOKEN)
client.commands = new Collection();

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

var servers = {};

client.once('ready', () =>{
    console.log(`${client.user.username} ready!`);
    client.user.setActivity(`${PREFIX}help and ${PREFIX}play`, { type: "LISTENING" });
});

client.on('message', async(msg) => {
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;

  const args = msg.content.split(/ +/);
  // const args = msg.content.substring(PREFIX.length).split(" ");
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);
  
  // if (!client.commands.has(command)) return;
  console.info(args);
  try {
    if (command == '$play'){
      if (!args[0]){
        return msg.channel.send("you need to join a channel first");
      }
      
      if(!servers[msg.guild.id]) servers[msg.guild.id] = {
        queue: []
      }
      
      var server = servers[msg.guild.id];
      server.queue.push(args[0])

      if (!msg.guild.voiceConnection) msg.member.voice.channel.join().then(function(connection){
          // play(connection, msg);
        var server = servers[msg.guild.id];
        server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));
        server.queue.shift();
        server.dispatcher.on("end", function(){
          if (server.queue[0]){
            play(connection, msg);
          }else{
            connection.disconnect();
          }
        })
      })
    }else{
      client.commands.get(command).execute(msg, args);
    }
  } catch (error) {
    console.error(error);
    msg.reply('there was an error trying to execute that command!');
  }
});
