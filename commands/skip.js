const { validate_queue, validate_voice_channel } = require("../utility/validation")

function skip_to(server, index){
    server.playing = true;

    if (server.loop) {
        for (let i = 0; i < index - 2; i++) {
            server.waiting_list.push(server.waiting_list.shift());
        }
        } else {
        server.waiting_list = server.waiting_list.slice(index - 2);
    }

    server.connection.dispatcher.end();  
    return;
}

module.exports = {
    name: 'skip',
    description: 'skip a song',
    execute(message, args){
        let check = validate_queue(message);
        if (check != "success")
            return message.channel.send(check);
        check = validate_voice_channel(message);
        if (check != "success")
            return message.channel.send(check).catch(console.error);

        const current_server = message.client.servers.get(message.guild.id);

        if (!args.length){
            song = current_server.waiting_list[0];
            current_server.playing = true;
            current_server.connection.dispatcher.end(); 
            return current_server.text_channel.send(`${message.author} - ⏭️ skipped ${song.title}`);
        }else{
            if (isNaN(args[0]))
                return message
                    .reply("Error: Please enter an integer after $skip")
                    .catch(console.error);
            if (args[0] > current_server.waiting_list.length)
                return message.reply(`The queue is only ${current_server.waiting_list.length} songs long!`).catch(console.error);

            skip_to(current_server, args[0]);
            current_server.text_channel.send(`${message.author} ⏭ skipped ${args[0] - 1} songs`).catch(console.error);
        }
    },
};