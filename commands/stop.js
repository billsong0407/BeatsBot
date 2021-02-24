const { validate_queue } = require("../utility/validation")

module.exports = {
    name: 'stop',
    description: 'stop playing music',
    execute(message, args){
        let check = validate_queue(message);
        if (check != "success")
        return message.channel.send(check).catch(console.error);

        const current_server = message.client.servers.get(message.guild.id);
        current_server.waiting_list = [];
        current_server.loop = false;
        current_server.connection.dispatcher.end();
        return current_server.text_channel.send(`${message.author} - ⏹️ stopped playing music!`);
    },
};