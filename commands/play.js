const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { create_queue } = require('../utility/queue');
const { create_song } = require('../utility/song');

module.exports = {
    name: "play",
    description: "plays music",
    async execute(msg, args) {
        const voice_channel = msg.member.voice.channel;
        const serverQueue = msg.client.queue.get(msg.guild.id);
        queue = create_queue(msg);
        url = args[0];

        function play(msg){
            console.info("playing");
            var server = msg.client.queue.get(msg.guild.id);
            console.info(server.songs);
            server.dispatcher = server.connection.play(ytdl(server.songs[0].url, {filter: "audioonly"}));
            // server.songs.shift();
            server.dispatcher.on("finish", function(){
                if (servers.songs[0]){
                    server.songs.shift();
                    play(msg);
                }else{
                    server.connection.disconnect();
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
            song = create_song(await ytdl.getInfo(url));
        } catch (error) {
            console.error(error);
            return msg.reply(error.msg).catch(console.error);
        }

        if (serverQueue) {
            serverQueue.songs.push(song);
            return serverQueue.textChannel
            .send(`✅ **${song.title}** has been added to the queue by ${msg.author}`)
            .catch(console.error);
        }
        queue.songs.push(song);
        msg.client.queue.set(msg.guild.id, queue);

        try {
            queue.connection = await voice_channel.join();
            await queue.connection.voice.setSelfDeaf(false);
            play(msg);
        } catch (error) {
            console.error(error);
            msg.client.queue.delete(msg.guild.id);
            await channel.leave();
            return msg.channel.send(`Could not join the channel: ${error}`).catch(console.error);
        }

        

        // const connection = await voice_channel.join();
        // const videoFinder = async(query) =>{
        //     const video_result
        // }
    },
};