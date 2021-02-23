const { DEFAULT_VOLUME } = require("./util");

module.exports = {
    create_server(msg){
        const server = {};
        server.text_channel = msg.channel;
        server.channel = msg.member.voice.channel;
        server.connection = null;
        server.waiting_list = [];
        server.loop = false;
        server.volume = DEFAULT_VOLUME || 100;
        server.playing = true;
        return server;
    },
}