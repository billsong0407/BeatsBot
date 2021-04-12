/**
 * @file help.js
 * @author Bill Song
 * @description Help Module (M19) - Shows the user manual
 */

/**
 * @require - MessageEmbed Object from discord.js 
 */
const { MessageEmbed } = require("discord.js");

/**
 * @exports Help
 * @description Help Module (M19)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Help
   * @property {string} name - "help"
   * @property {integer} cooldown - 5
   * @property {string} description - "Manual for using the commands" 
   * @property {function} execute(message) - help function
   */
  name: "help",
  cooldown: 5,
  description: "Manual for using the commands",
  
  /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for showing the user manual
  */ 
  execute(message) {
    let commands = message.client.commands.array();

    let user_manual = new MessageEmbed()
      .setTitle("BeatsBot User Manual")
      .setDescription("List of all commands")
      .setColor("#9B59B6");

    // Add each command with its description into the message embed
    for(const command of commands){
      user_manual.addField(
        `**$${command.name}**`,
        `${command.description}`,
        true
      );
    }
    return message.channel.send(user_manual).catch(console.error);
  }
};
