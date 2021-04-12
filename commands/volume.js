/**
 * @file volume.js
 * @author Bill Song
 * @description Volume Module (M8) - Changing music volume
 */

/**
 * @require valid_queue function from validation module
 * @require validate_voice_channel from validation module 
 */
const { validate_queue, validate_voice_channel } = require("../utility/validation")

/**
 * @exports Volume
 * @description Volume Module (M8)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Volume
   * @property {string} name - "volume"
   * @property {string} description - "Change volume of currently playing music"
   * @property {function} execute(message) - volume function
   */
  name: "volume",
  description: "Change volume of currently playing music",

  /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for changing volume
  */ 
  execute(message, args) {
    let check = validate_queue(message);
    if (check != "success")
        return message.channel.send(check);
    check = validate_voice_channel(message);
    if (check != "success")
        return message.channel.send(check);

    const current_server = message.client.servers.get(message.guild.id);

    const volume = args[0]
    if (!volume) return message.reply(` - 🎧 The current volume is: **${current_server.volume}%**`);
    if (isNaN(volume)) return message.reply(" - ⚠️ Please enter a number to set the volume");
    if (volume > 100 || volume < 0)
      return message.reply(" - ⚠️ Please enter a number between 0 - 100");

    current_server.volume = volume;
    current_server.connection.dispatcher.setVolumeLogarithmic(volume / 100); // set dispatcher volume

    return message.reply(` - 🎧 Volume is adjusted to: **${volume}%**`);
  }
};