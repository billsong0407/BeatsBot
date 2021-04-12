/**
 * @file skip.js
 * @author Bill Song
 * @description Skip Module (M3) - Skip music
 */

/**
 * @require valid_queue function from validation module
 * @require validate_voice_channel from validation module 
 */
const { validate_queue, validate_voice_channel } = require("../utility/validation")

/**
 * @function skip_to
 * @param {Server} server 
 * @param {integer} index 
 * @description skip to a specific song in queue using an index number
 */
function skip_to(server, index){
    server.playing = true;

    if (server.loop) {
        for (let i = 0; i < index - 1; i++) {
            server.waiting_list.push(server.waiting_list.shift());
        }
    } else {
        if (index >= 2) server.waiting_list = server.waiting_list.slice(index - 1);
    }

    server.connection.dispatcher.end();  
    return;
}

/**
 * @exports Skip
 * @description Skip Module (M3)
 */ 
module.exports = {
  /** 
   * @typedef {Discord.command} Skip
   * @property {string} name - "skip"
   * @property {string} description - "Skip a song"
   * @property {function} execute(message) - skip function
   */
    name: 'skip',
    description: 'Skip a song',

    /**
     * @function execute
     * @param {Discord.message} message - message sent by an user
     * @param {Array.sting} args - arguments (list of strings) entered by an user after the command
     * @description algorithm for resume a song
    */ 
    execute(message, args){
        let check = validate_queue(message);
        if (check != "success")
            return message.channel.send(check);
        check = validate_voice_channel(message);
        if (check != "success")
            return message.channel.send(check).catch(console.error);

        const current_server = message.client.servers.get(message.guild.id);
        if (!args.length){ // checks if an index number is entered
            song = current_server.waiting_list[0];
            current_server.playing = true;
            current_server.connection.dispatcher.end(); // ends the current playing music
            return current_server.text_channel.send(`${message.author} - ⏭️ skipped ${song.title}`);
        }else{
            if (isNaN(args[0])) // checks if it is a natural number
                return message.reply(" - ⚠️ Please enter an integer after $skip");
            if (args[0] > current_server.waiting_list.length)
                return message.reply(` - ⚠️ The queue only has ${current_server.waiting_list.length} songs!`);

            skip_to(current_server, args[0]); // call the skip_to function
            return current_server.text_channel.send(`${message.author} - ⏭ skipped ${args[0]} songs`);
        }
    },
};