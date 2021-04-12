/**
 * @file shuffle.js
 * @author Bill Song
 * @description Shuffle Module (M9) - Shuffle queue
 */

/**
 * @require valid_queue function from validation module
 * @require validate_voice_channel from validation module 
 */
const { validate_queue, validate_voice_channel } = require("../utility/validation")

/**
 * @exports Shuffle
 * @description Shuffle Module (M9)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Shuffle
   * @property {string} name - "shuffle"
   * @property {integer} cooldown - 10
   * @property {string} description - "Shuffle queue"
   * @property {function} execute(message) - shuffle function
   */
  name: "shuffle",
  cooldown: 10,
  description: "Shuffle queue",

  /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for shuffling a queue
  */ 
  execute(message) {
    let check = validate_queue(message);
    if (check != "success")
        return message.channel.send(check);
    check = validate_voice_channel(message);
    if (check != "success")
        return message.channel.send(check).catch(console.error);

    const current_server = message.client.servers.get(message.guild.id);

    let queue = current_server.waiting_list;
    for (let i = queue.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i); // randomize the order
      [queue[i], queue[j]] = [queue[j], queue[i]]; // swap the music
    }
    current_server.waiting_list = queue;
    message.client.servers.set(message.guild.id, current_server); // overwrite the previous queue
    try {
      return current_server.text_channel.send(`${message.author} - 🔀 shuffled the queue`)
    } catch (error) {
      current_server.text_channel.send(err)
    }
  }
};