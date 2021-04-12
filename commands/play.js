/**
 * @file play.js
 * @author Bill Song
 * @description Play Module (M2) - Plays YouTube music through link or keywords
 */

/**
 * @require ytdl from ytdl-core library
 * @require ytSearch from yt-search library 
 * @require create_server from server module
 * @require create_song from song module
 * @require show_GUI from GUI module
 */
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { create_server } = require('../utility/server');
const { create_song } = require('../utility/song');
const { show_GUI } = require("../utility/GUI");

/**
 * @function play
 * @param {Discord.message} msg 
 * @description fetch the audio file in YouTube and plays it through Discord Dispatcher
 */
async function play(msg){
  var server = msg.client.servers.get(msg.guild.id);
  // returns if nothing is playing
  if (!server.waiting_list) return;
  if (!server.playing) return;
  
  const dispatcher = server.connection
    .play(ytdl(server.waiting_list[0].url, {filter: "audioonly"})) // plays the downloaded audio file
    .on("finish", function(){ // if a song is finished playing
      if (server.loop) {
        let lastSong = server.waiting_list.shift();
        server.waiting_list.push(lastSong); // add the song to the end
        play(msg)
      } else {
        server.waiting_list.shift();
        if (server.waiting_list[0]){
          play(msg); // plays the next song
        }else{
          msg.client.servers.delete(msg.guild.id) // if there are no more song in the queue
          server.connection.disconnect(); // bot leaves the channel
        }
      }
    })
    .on("error", (err) => { // if there is an error when downloading the audio file
      console.error(err);
      server.waiting_list.shift(); // plays the next song in queue
      play(msg)
    })
    .on("disconnect", () => msg.client.servers.delete(msg.guild.id));

  dispatcher.setVolumeLogarithmic(server.volume / 100); // set music volume

  show_GUI(msg, server); // display GUI
  
  return;
}

/**
 * @exports Play
 * @description Play Module (M2)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Play
   * @property {string} name - "play"
   * @property {string} description - "Play music through keyword search or YouTube link"
   * @property {function} execute(message) - play function
   */
  name: "play",
  description: "Play music through keyword search or YouTube link",

  /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for playing a song
  */ 
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

    // validating URL
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
        // Search the song by keywords
        const video_results = await ytSearch(keyword);
        if (video_results.videos.length >= 1){
          song_info = video_results.videos[0]; // The first song returned from the search is the most relevant
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
          song_info = null; // if no results are returned
          return message.reply("No content found!")
        }
      } catch (error) {
        console.error(error);
        return message.reply(error.message).catch(console.error);
      }
    }

    if (current_server) { // if there is already a song playing by the bot
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
      if (voice_channel) server.connection = await voice_channel.join(); // joins the voice channel
      await server.connection.voice.setSelfDeaf(true); // set defean to true
      play(message); // play the song
    } catch (error) {
      console.error(error);
      message.client.servers.delete(message.guild.id);
      await channel.leave();
      return message.reply(` - ❌ Could not join the channel: ${error}`).catch(console.error);
    }
  },
};