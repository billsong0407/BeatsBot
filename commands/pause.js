const { validate_queue, validate_voice_channel } = require("../utility/validation")

module.exports = {
  name: "pause",
  description: "Pause the currently playing song",
  execute(message) {
    let check = validate_queue(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);
    check = validate_voice_channel(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);

    const current_server = message.client.servers.get(message.guild.id);
    if (!current_server) return message.channel.send(`⚠️ ${message.author}No songs are currently playing.`).catch(console.error);
    if (message.member.voice.channelID != message.member.guild.voice.channelID) return message.channel.send(`⚠️ ${message.author} You must join a voice channel first!`);

    if (current_server.playing) {
      current_server.playing = false;
      current_server.connection.dispatcher.pause(true);
      return current_server.text_channel.send(`⏸ ${message.author} paused the music.`).catch(console.error);
    }
  }
};