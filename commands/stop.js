module.exports = {
    name: 'stop',
    description: 'stop playing music',
    execute(msg, args){
        let check = validate_queue(message);
        if (check != "success")
        return message.channel.send(check).catch(console.error);

        const current_server = msg.client.servers.get(msg.guild.id);
        current_server.waiting_list = [];
        current_server.loop = false;
        current_server.connection.dispatcher.end();
        return current_server.text_channel.send(`⏹️ ${msg.author} stopped playing music!`);
    },
};