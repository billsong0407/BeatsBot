const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { create_queue } = require('../utility/queue');
const { create_song } = require('../utility/song');

function play(msg){
    var server = msg.client.servers.get(msg.guild.id);
    if (!server.waiting_list[0].url) return;
    const dispatcher = server.connection
        .play(ytdl(server.waiting_list[0].url, {filter: "audioonly"}))
        .on("finish", function(){
            if (server.loop) {
                // if loop is on, push the song back at the end of the queue
                let lastSong = server.waiting_list.shift();
                server.waiting_list.push(lastSong);
                play(msg)
            } else {
                server.waiting_list.shift();
                if (server.waiting_list[0]){
                    play(msg);
                }else{
                    msg.client.servers.delete(msg.guild.id)
                    server.connection.disconnect();
                }
            }
        })
        .on("error", (err) => {
            console.error(err);
            server.waiting_list.shift();
            play(msg)
        });
    dispatcher.setVolumeLogarithmic(server.volume / 100);
    return;
}

module.exports = {
    name: "play",
    description: "plays music",
    async execute(msg, args) {
        const voice_channel = msg.member.voice.channel;
        const current_server = msg.client.servers.get(msg.guild.id);

        if (!voice_channel) {
            return msg.reply("You need to join a voice channel first!");
        }

        if (!args.length){
            return message
            .reply(`You need to add a keyword or YouTube URL`)
            .catch(console.error);
        }
        
        song_url = args[0];

        
        const permission_list = msg.member.voice.channel.permissionsFor(msg.client.user);

        if (!permission_list.has("CONNECT") || !permission_list.has("SPEAK")){
            return msg.reply("❌ I do not have the correct permissions to use it")
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
            .send(`🎶 **${song.title}** has been added to the queue by ${msg.author}`)
            .catch(console.error);
        }else{
            server = create_queue(msg);
            server.waiting_list.push(song);
            msg.client.servers.set(msg.guild.id, server);
        }
        

        try {
            if (voice_channel) server.connection = await voice_channel.join();
            await server.connection.voice.setSelfDeaf(true);
            play(msg);
        } catch (error) {
            console.error(error);
            msg.client.servers.delete(msg.guild.id);
            await channel.leave();
            return msg.channel.send(`❌ Could not join the channel: ${error}`).catch(console.error);
        }

        

        // const connection = await voice_channel.join();
        // const videoFinder = async(query) =>{
        //     const video_result
        // }
    },
};