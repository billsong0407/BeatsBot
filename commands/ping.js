/**
 * @file ping.js
 * @author Bill Song
 * @description Ping Module (M18)
 */

/**
 * @exports Ping
 * @description Ping Module (M18)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Ping
   * @property {string} name - "Ping"
   * @property {string} description - "Reveal the bot's average ping"
   * @property {function} execute(message) - ping function
   */
  name: "ping",
  cooldown: 10,
  description: "Reveal the bot's average ping",

  /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for calculating user's ping to the server
  */ 
  execute(message) {
    message.reply(` - 📶 Average ping to server: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
  }
};