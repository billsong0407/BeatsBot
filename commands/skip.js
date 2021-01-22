module.exports = {
    name: 'skip',
    description: 'skip a song',
    execute(msg, args){
        const current_server = msg.client.queue.get(msg.guild.id);
        if (!current_server.dispatcher){
            current_server.text_channel.send("There is no music to skip");
        }else{
            console.info(current_server.waiting_list[0])
            song = current_server.waiting_list[0];
            current_server.dispatcher.end();
            current_server.text_channel.send(`${msg.author} skipped ${song.title}`);
        }
        return;
    },
};