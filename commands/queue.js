/**
 * @file queue.js
 * @author Bill Song
 * @description Queue Module (M17) - Shows the queue in the server
 */

/**
 * @require MessageEmbed from discord.js library
 * @require valid_queue function from validation module
 * @require validate_voice_channel from validation module 
 */
const { MessageEmbed } = require("discord.js");
const { validate_queue, validate_voice_channel } = require("../utility/validation");

/**
 * @function list_each_song
 * @description add each song in the queue to a embedded message
 * @param {Array.Song} queue - a list of Songs
 * @returns {Discord.MessageEmbed} embed
 */
function list_each_song(queue) {
    let j = 0;
    const info = queue.map((song) => `${++j} - [${song.title}](${song.url})`).join("\n");

    const embed = new MessageEmbed()
        .setTitle("Songs In Queue\n")
        .setColor("#E91E63")
        .setDescription(`**Currently Playing - [${queue[0].title}](${queue[0].url})**\n\n${info}`)
        .setTimestamp();
  return embed;
}

/**
 * @exports Queue
 * @description Queue Module (M17)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Queue
   * @property {string} name - "queue"
   * @property {integer} cooldown - 5
   * @property {string} description - "Show the music queue and the current playing song"
   * @property {function} execute(message) - show queue function
   */
  name: "queue",
  cooldown: 5,
  description: "Show the music queue and the current playing song.",

  /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for showing the queue
  */ 
  async execute(message) {
    let check = validate_queue(message);
    if (check != "success")
        return message.channel.send(check);
    check = validate_voice_channel(message);
    if (check != "success")
        return message.channel.send(check).catch(console.error);

    const current_server = message.client.servers.get(message.guild.id);

    const embed = list_each_song(current_server.waiting_list);

    return message.channel.send(embed);
  }
};