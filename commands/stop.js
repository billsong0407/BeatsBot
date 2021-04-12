/**
 * @file stop.js
 * @author Bill Song
 * @description Stop Module (M4) - Stop playing music
 */

/**
 * @require valid_queue function from validation module
 */
const { validate_queue } = require("../utility/validation")

/**
 * @exports Stop
 * @description Stop Module (M4)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Stop
   * @property {string} name - "stop"
   * @property {string} description - "Stop playing music"
   * @property {function} execute(message) - resume function
   */
    name: 'stop',
    description: 'Stop playing music',

    /**
   * @function execute
   * @param {Discord.message} message - message sent by an user
   * @description algorithm for stopping playing music in the server
  */ 
    execute(message){
        let check = validate_queue(message);
        if (check != "success")
        return message.channel.send(check).catch(console.error);

        const current_server = message.client.servers.get(message.guild.id);
        current_server.waiting_list = []; // empty the queue
        current_server.loop = false; // turn loop to false
        current_server.playing = false; // set playing status to false
        current_server.connection.dispatcher.end(); // ends the dispatcher
        return current_server.text_channel.send(`${message.author} - ⏹️ stopped playing music!`);
    },
};