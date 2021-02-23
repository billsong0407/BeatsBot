const createBar = require("string-progressbar");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "nowplaying",
  description: "Show the current playing song",
  execute(message) {
    const server = message.client.servers.get(message.guild.id);
    if (!server) return message.reply("There is nothing playing.").catch(console.error);

    const song = server.waiting_list[0];
    const seek = (server.connection.dispatcher.streamTime - server.connection.dispatcher.pausedTime) / 1000;
    const time_left = song.duration - seek;

    message.channel.send({
        embed: {
            color: 'RED',
            author: { name: song.title },
            footer: { text: "Time Remaining: " + new Date(time_left * 1000).toISOString().substr(11, 8) },
            fields: [
                { name: 'Channel', value: song.artist, inline: true },
                { name: 'Requested by', value: song.requested_by, inline: true },
                { name: 'Playlist', value: 'Null', inline: true },

                { name: 'Views', value: song.view_count, inline: true },
                { name: 'Average Rating', value: song.avg_rating, inline: true},
                { name: 'Length', value: song.duration, inline: true },

                { name: 'Volume', value: server.volume, inline: true },
                { name: 'Repeat mode', value: server.loop ? 'Yes' : 'No', inline: true },
                { name: 'Currently paused', value: server.playing ? 'Yes' : 'No', inline: true },

                { name: 'Progress bar', value: new Date(seek * 1000).toISOString().substr(11, 8) +
                                                "[" +
                                                createBar(song.duration == 0 ? seek : song.duration, seek, 20)[0] +
                                                "]" +
                                                (song.duration == 0 ? " ◉ LIVE" : new Date(song.duration * 1000).toISOString().substr(11, 8)), 
                                                inline: true }
            ],
            timestamp: new Date(),
        },
    });
  }
};