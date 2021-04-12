/**
 * @file loop.js
 * @author Bill Song
 * @description Loop Module (M7) - Loop the current playing song
 */

/**
 * @require valid_queue function from validation module
 * @require validate_voice_channel from validation module 
 */
const { validate_queue, validate_voice_channel } = require("../utility/validation")

/**
 * @exports Loop
 * @description Loop Module (M7)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Loop
   * @property {string} name - "loop"
   * @property {string} description - "Loop the current playing song"
   * @property {function} execute(message) - loop function
   */
  name: "loop",
  description: "Loop the current playing song",

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
    
    const current_server = message.client.servers.get(message.guild.id);
    current_server.loop = !current_server.loop;
    song = current_server.waiting_list[0];
    return current_server.text_channel.send(`${message.author} - ${current_server.loop ? "🔄" : "🛑"} Loop is ${current_server.loop ? "**enabled**" : "**diabled**"} for ${song.title}`).catch(console.error);
  }
};