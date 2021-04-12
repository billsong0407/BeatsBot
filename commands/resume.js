/**
 * @file resume.js
 * @author Bill Song
 * @description Resume Module (M6) - Resume playing music
 */

/**
 * @require valid_queue function from validation module
 * @require validate_voice_channel from validation module 
 */
const { validate_queue, validate_voice_channel } = require("../utility/validation")

/**
 * @exports Resume
 * @description Resume Module (M6)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Resume
   * @property {string} name - "resume"
   * @property {string} description - "Resume playing song"
   * @property {function} execute(message) - resume function
   */
  name: "resume",
  description: "Resume currently paused song",

  /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for resume a song
  */ 
  execute(message) {
    let check = validate_queue(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);
    check = validate_voice_channel(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);
    const current_server = message.client.servers.get(message.guild.id);

    try {
      if (!current_server.playing) {
        current_server.playing = true; // set playing status to true
        current_server.connection.dispatcher.resume(); // resume the dispatcher
        return current_server.text_channel.send(`${message.author} - ▶️ resumed the music!`);
      }
      return message.reply(" - ⚠️ The music is still playing.");
    } catch (error) {
      throw error;
    } 
  }
};
