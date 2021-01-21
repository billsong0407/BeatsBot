const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: "play",
    description: "plays music",
    execute(msg, args) {
        const voice_channel = msg.member.voice.channel;

        if (!voice_channel) {
            return msg.reply("You need to join a voice channel first!");
        }
        const permission_list = voice_channel.permissionFor(message.client.user);

        if (!permission_list.has("CONNECT") || !permission_list.has("SPEAK")){
            return msg.reply("You do not have the correct permissions to use it")
        }

        if (!args.length){
            return msg.channel.send("You need to enter a keyword of http link")
        }

        

        // const connection = await voice_channel.join();
        // const videoFinder = async(query) =>{
        //     const video_result
        // }
    }
}