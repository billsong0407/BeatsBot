const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { create_queue } = require('../utility/queue');
const { create_song } = require('../utility/song');

module.exports = {
    name: "play",
    description: "plays music",
    async execute(msg, args) {
        const voice_channel = msg.member.voice.channel;
        const current_server = msg.client.servers.get(msg.guild.id);
        server = create_queue(msg);

        song_url = args[0];

        function play(msg){
            var server = msg.client.servers.get(msg.guild.id);
            // console.info(server.songs);
            server.dispatcher = server.connection.play(ytdl(server.waiting_list[0].url, {filter: "audioonly"}));
            
            server.dispatcher.on("finish", function(){
                server.waiting_list.shift();
                if (server.waiting_list[0]){
                    play(msg);
                }else{
                    msg.client.servers.delete(msg.guild.id)
                    server.connection.disconnect();
                    return
                }
            })
        }

        if (!voice_channel) {
            return msg.reply("You need to join a voice channel first!");
        }
        const permission_list = msg.member.voice.channel.permissionsFor(msg.client.user);

        if (!permission_list.has("CONNECT") || !permission_list.has("SPEAK")){
            return msg.reply("I do not have the correct permissions to use it")
        }

        if (!args.length){
            return msg.channel.send("You need to enter a keyword of http link")
        }

        try {
            song = create_song(await ytdl.getInfo(song_url));
        } catch (error) {
            console.error(error);
            return msg.reply(error.msg).catch(console.error);
        }

        if (current_server) {
            current_server.waiting_list.push(song);
            return current_server.text_channel
            .send(`✅ **${song.title}** has been added to the queue by ${msg.author}`)
            .catch(console.error);
        }
        server.waiting_list.push(song);
        msg.client.servers.set(msg.guild.id, server);

        try {
            if (voice_channel) server.connection = await voice_channel.join();
            await server.connection.voice.setSelfDeaf(true);
            play(msg);
        } catch (error) {
            console.error(error);
            msg.client.servers.delete(msg.guild.id);
            await channel.leave();
            return msg.channel.send(`Could not join the channel: ${error}`).catch(console.error);
        }

        

        // const connection = await voice_channel.join();
        // const videoFinder = async(query) =>{
        //     const video_result
        // }
    },
};