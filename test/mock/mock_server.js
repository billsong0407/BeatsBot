module.exports = {
    create_server(msg){
        const server = {};
        server.text_channel = msg.channel;
        server.channel = msg.member.voice.channel;
        server.waiting_list = [];
        server.connection = {
            dispatcher: {
                end(){
                    server.waiting_list.shift();
                },
                setVolumeLogarithmic(){
                    return;
                },
                pause(){
                    server.playing=false;
                    return;
                },
                resume(){
                    server.playing=true;
                    return;
                }
            }
        };
        server.loop = false;
        server.volume = 100;
        server.playing = true;
        return server;
    },
}