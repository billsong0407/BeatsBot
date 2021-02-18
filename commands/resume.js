module.exports = {
  name: "resume",
  description: "Resume currently paused song",
  execute(message) {
    const current_server = message.client.servers.get(message.guild.id);
    if (!current_server) return message.send(`⚠️ ${message.author} There is nothing playing.`).catch(console.error);
    if (message.member.voice.channelID != message.member.guild.voice.channelID) return message.send(`⚠${message.author} You must join a voice channel first!`);

    if (!current_server.playing) {
      current_server.playing = true;
      current_server.connection.dispatcher.resume();
      return current_server.text_channel.send(`▶️ ${message.author} resumed the music!`).catch(console.error);
    }

    return message.reply("The queue is not paused.").catch(console.error);
  }
};
