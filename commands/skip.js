module.exports = {
    name: 'skip',
    description: 'skip a song',
    execute(msg, args){
        const current_server = msg.client.servers.get(msg.guild.id);
        if (!current_server || !current_server.connection.dispatcher){
            msg.reply("Currently no music playing!");
        }else{
            song = current_server.waiting_list[0];
            current_server.connection.dispatcher.end();
            current_server.text_channel.send(`${msg.author} skipped ${song.title}`);
        }
        return;
    },
};