module.exports = {
  name: "pause",
  description: "Pause the currently playing song",
  execute(message) {
    const current_server = message.client.servers.get(message.guild.id);
    if (!current_server) return message.reply("No songs are currently playing.").catch(console.error);
    if (message.member.voice != message.member.guild.voice.channelID) return message.reply("You must join a voice channel first");

    if (current_server.playing) {
      current_server.playing = false;
      current_server.connection.dispatcher.pause(true);
      return current_server.text_channel.send(`${message.author} ⏸ paused the music.`).catch(console.error);
    }
  }
};