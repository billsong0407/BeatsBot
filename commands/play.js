const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { create_server } = require('../utility/server');
const { create_song } = require('../utility/song');

async function play(msg){
  var server = msg.client.servers.get(msg.guild.id);
  if (!server.waiting_list) return;
  // if (typeof server.waiting_list[0].url !== 'undefined') return;
  const dispatcher = server.connection
    .play(ytdl(server.waiting_list[0].url, {filter: "audioonly"}))
    .on("finish", function(){
      if (server.loop) {
        let lastSong = server.waiting_list.shift();
        server.waiting_list.push(lastSong);
        play(msg)
      } else {
        server.waiting_list.shift();
        if (server.waiting_list[0]){
          play(msg);
        }else{
          msg.client.servers.delete(msg.guild.id)
          server.connection.disconnect();
        }
      }
    })
    .on("error", (err) => {
      console.error(err);
      server.waiting_list.shift();
      play(msg)
    })
    .on("disconnect", () => msg.client.servers.delete(msg.guild.id));
  dispatcher.setVolumeLogarithmic(server.volume / 100);

  current_song = server.waiting_list[0];

  try {
    var music_GUI = await server.text_channel.send(`🎶 Currently playing: **${current_song.title}**`);
    await music_GUI.react("⏭");
    await music_GUI.react("⏯");
    await music_GUI.react("🔇");
    await music_GUI.react("🔉");
    await music_GUI.react("🔊");
    await music_GUI.react("🔁");
    await music_GUI.react("⏹");
  } catch (error) {
      console.error(error);
  }

  const filter = (reaction, user) => user.id !== msg.client.user.id;
  var collector = music_GUI.createReactionCollector(filter, {
    time: current_song.duration > 0 ? current_song.duration * 1000 : 600000
  });

  collector.on("collect", (reaction, user) => {
    if (!server) return;
    const member = msg.guild.member(user);
    if (member.voice.channelID !== member.guild.voice.channelID) {
      member.send("${user} - ❌ You need to join the voice channel first!").catch(console.error);
      return;
    }

  switch (reaction.emoji.name) {
    case "⏭":
      server.playing = true;
      reaction.users.remove(user).catch(console.error);
      server.connection.dispatcher.end();
      server.text_channel.send(`${user} - ⏩ skipped the song`).catch(console.error);
      collector.stop();
      break;

    case "⏯":
      reaction.users.remove(user).catch(console.error);
      if (server.playing) {
        server.playing = !server.playing;
        server.connection.dispatcher.pause(true);
        server.text_channel.send(`${user} - ⏸ paused the music.`).catch(console.error);
      } else {
        server.playing = !server.playing;
        server.connection.dispatcher.resume();
        server.text_channel.send(`${user} - ▶ resumed the music!`).catch(console.error);
      }
      break;

    case "🔁":
      reaction.users.remove(user).catch(console.error);
      server.loop = !server.loop;
      server.text_channel.send(`Loop is now ${server.loop ? "**on**" : "**off**"}`).catch(console.error);
      break;

    case "⏹":
      reaction.users.remove(user).catch(console.error);
      server.waiting_list = [];
      server.text_channel.send(`${user} - ⏹ stopped the music!`).catch(console.error);
      try {
        server.connection.dispatcher.end();
      } catch (error) {
        console.error(error);
        server.connection.disconnect();
      }
      collector.stop();
      break;

      default:
        reaction.users.remove(user).catch(console.error);
        break;
      }
  });

  let config;

  try {
    config = require("../config.json");
  } catch (error) {
    config = null;
  }

  const PRUNING = config ? config.PRUNING : process.env.PRUNING;

  collector.on("end", () => {
    music_GUI.reactions.removeAll().catch(console.error);
    if (PRUNING && music_GUI && !music_GUI.deleted) {
      music_GUI.delete({ timeout: 3000 }).catch(console.error);
    }
  });

  return;
}

module.exports = {
  name: "play",
  description: "plays music",
  async execute(message, args) {
    const voice_channel = message.member.voice.channel;
    const current_server = message.client.servers.get(message.guild.id);

    if (!voice_channel) {
        return message.reply(" - ❌ You need to join a voice channel first!");
    }

    if (!args.length){
        return message
        .reply(` - ❌ You need to add a keyword or an YouTube URL`)
        .catch(console.error);
    }
    
    song_url = args[0];

    
    const permission_list = message.member.voice.channel.permissionsFor(message.client.user);

    if (!permission_list.has("CONNECT") || !permission_list.has("SPEAK")){
      return message.reply(" - ❌ I do not have the correct permissions to use it")
    }

    try {
      song = create_song(await ytdl.getInfo(song_url), message.author.username);
    } catch (error) {
      console.error(error);
      return message.reply(error.msg).catch(console.error);
    }

    if (current_server) {
      current_server.waiting_list.push(song);
      return current_server.text_channel
      .send(`🎶 **${song.title}** has been added to the queue by ${message.author}`)
      .catch(console.error);
    }else{
      server = create_server(message);
      server.waiting_list.push(song);
      message.client.servers.set(message.guild.id, server);
    }
    
    try {
      if (voice_channel) server.connection = await voice_channel.join();
      await server.connection.voice.setSelfDeaf(true);
      play(message);
    } catch (error) {
      console.error(error);
      message.client.servers.delete(message.guild.id);
      await channel.leave();
      return message.channel.send(` - ❌ Could not join the channel: ${error}`).catch(console.error);
    }
    // const connection = await voice_channel.join();
    // const videoFinder = async(query) =>{
    //     const video_result
    // }
  },
};