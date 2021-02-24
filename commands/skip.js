const { validate_queue } = require("../utility/validation")

module.exports = {
    name: 'skip',
    description: 'skip a song',
    execute(message, args){
        let check = validate_queue(message);
        if (check != "success")
            return message.channel.send(check);

        const current_server = message.client.servers.get(message.guild.id);
        song = current_server.waiting_list[0];
        current_server.playing = true;
        current_server.connection.dispatcher.end(); 
        return current_server.text_channel.send(`${message.author} - ⏭️ skipped ${song.title}`);
    },
};