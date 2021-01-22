module.exports = {
    name: 'stop',
    description: 'stop playing music',
    execute(msg, args){
        const current_server = msg.client.queue.get(msg.guild.id);
        if (!current_server || !current_server.connection.dispatcher){
            msg.reply("Currently no music playing!");
        }else{
            current_server.waiting_list = [];
            current_server.connection.dispatcher.end();
            current_server.text_channel.send(`${msg.author} stopped playing music!`);
        }
        return;
    },
};