const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { create_server } = require('../utility/server');
const { create_song } = require('../utility/song');
const { show_GUI } = require("../utility/GUI");

async function play(msg){
  var server = msg.client.servers.get(msg.guild.id);
  if (!server.waiting_list) return;
  if (!server.playing) return;
  
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

  show_GUI(msg, server);
  
  return;
}

module.exports = {
  name: "play",
  description: "plays music through keyword search or YouTube link",
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
    
    const permission_list = message.member.voice.channel.permissionsFor(message.client.user);

    if (!permission_list.has("CONNECT") || !permission_list.has("SPEAK")){
      return message.reply(" - ❌ I do not have the correct permissions to use it")
    }

    song_url = args[0];
    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;

    const urlValid = videoPattern.test(args[0]);

    if (urlValid) {
      try {
        song_info = await ytdl.getInfo(song_url);
        song = create_song(song_info, message.author.username);
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }else{
      try {
        keyword = args.join('');
        
        const video_results = await ytSearch(keyword);
        // console.log(video_results.videos[0]);
        if (video_results.videos.length >= 1){
          song_info = video_results.videos[0];
          song = {
            requested_by: message.author.username,
            title: song_info.title,
            artist: song_info.author.name,
            view_count: song_info.views,
            avg_rating: "N/A",
            url: song_info.url,
            duration: song_info.seconds,
          };
        }else{
          song_info = null;
          return message.reply("No content found!")
        }
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    if (current_server) {
      current_server.waiting_list.push(song);
      return current_server.text_channel
      .send(`**${song.title}** has been added to the queue by ${message.author}`)
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
      return message.reply(` - ❌ Could not join the channel: ${error}`).catch(console.error);
    }
  },
};