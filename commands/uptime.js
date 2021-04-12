/**
 * @file uptime.js
 * @author Bill Song
 * @description Uptime Module (M20) - Shows the bot's uptime
 */

/**
 * @exports Uptime
 * @description Uptime Module (M20)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Resume
   * @property {string} name - "uptime"
   * @property {string} description - "Shows the amount of time that the bot is online"
   * @property {function} execute(message) - uptime function
   */
  name: "uptime",
  description: "Shows the amount of time that the bot is online",
  /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for calculating the bot's uptime
  */ 
  execute(message) {
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    return message
      .reply(`- 🕰 Uptime: \`${days} day(s),${hours %= 24} hours, ${minutes %= 60} minutes, ${seconds %= 60} seconds\``)
      .catch(console.error);
  }
};