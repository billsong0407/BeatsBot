/**
 * @file nowPlaying.js
 * @author Bill Song
 * @description NowPlaying Module (M10) - Show the current playing song
 */

/**
 * @require - createBar function from string-progressbar
 * @require - validate_queue from validation module 
 * @require - show_GUI from GUI module
 */
const createBar = require("string-progressbar");
const { validate_queue } = require("../utility/validation")
const { show_GUI } = require("../utility/GUI");

/**
 * @exports NowPlaying
 * @description NowPlaying Module (M10)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} NowPlaying
   * @property {string} name - "nowplaying"
   * @property {string} description - "Show the current playing song"
   * @property {function} execute(message) - nowplaying function
   */
  name: "nowplaying",
  cooldown: 10,
  description: "Show the current playing song",

  /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for showing the current playing song
  */ 
  async execute(message) {
    let check = validate_queue(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);

    const server = message.client.servers.get(message.guild.id);

    const song = server.waiting_list[0];
    // calculate the current position in the song in terms of time
    const seek = (server.connection.dispatcher.streamTime - server.connection.dispatcher.pausedTime) / 1000; 
    const time_left = song.duration - seek; // calculate the amount of time left

    message.channel.send({
        embed: {
            color: 'RED',
            author: { name: song.title },
            footer: { text: "Time Remaining: " + new Date(time_left * 1000).toISOString().substr(11, 8) },
            fields: [
                { name: 'Channel', value: song.artist, inline: true },
                { name: 'Requested by', value: song.requested_by, inline: true },
                { name: 'Playlist', value: 'Null', inline: true },

                { name: 'Views', value: song.view_count, inline: true },
                { name: 'Average Rating', value: song.avg_rating, inline: true},
                { name: 'Length(sec)', value: song.duration, inline: true },

                { name: 'Volume', value: server.volume, inline: true },
                { name: 'Repeat mode', value: server.loop ? 'Yes' : 'No', inline: true },
                { name: 'Currently paused', value: server.playing ? 'Yes' : 'No', inline: true },

                { name: 'Progress bar', value: new Date(seek * 1000).toISOString().substr(11, 8) +
                                                "[" +
                                                createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
                                                "]" +
                                                (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)), 
                                                inline: true }
            ],
            timestamp: new Date(),
        },
    });
    show_GUI(message, server);
    }
};