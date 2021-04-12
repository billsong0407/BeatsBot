/**
 * @file pause.js
 * @author Bill Song
 * @description Pause Module (M5) - Pause music
 */

/**
 * @require valid_queue function from validation module
 * @require validate_voice_channel from validation module 
 */
const { validate_queue, validate_voice_channel } = require("../utility/validation")

/**
 * @exports Pause
 * @description Pause Module (M5)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Pause
   * @property {string} name - "pause"
   * @property {string} description - "Pause the current playing song"
   * @property {function} execute(message) - pause function
   */
  name: "pause",
  description: "Pause the currently playing song",

  /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for looping a song
  */ 
  execute(message) {
    let check = validate_queue(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);
    check = validate_voice_channel(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);

    // gets the current queue in this server
    const current_server = message.client.servers.get(message.guild.id);
    if (current_server.playing) {
      current_server.playing = false; // set playing status to false
      current_server.connection.dispatcher.pause(true); // pause the dispatcher
      try {
        return current_server.text_channel.send(`${message.author} - ⏸ paused the music.`)
      } catch (error) {
        return current_server.text_channel.send(error);
      }
    }
  }
};