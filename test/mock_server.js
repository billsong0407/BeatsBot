module.exports = {
    create_server(msg){
        const server = {};
        server.text_channel = msg.channel;
        server.channel = msg.member.voice.channel;
        server.connection = {
            dispatcher: {
                end(){
                    server.waiting_list.shift();
                }
            }
        };
        server.waiting_list = [];
        server.loop = false;
        server.volume = 100;
        server.playing = true;
        return server;
    },
}