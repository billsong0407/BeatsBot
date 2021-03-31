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
    if (current_server.playing) {
      current_server.playing = false;
      current_server.connection.dispatcher.pause(true);
      try {
        return current_server.text_channel.send(`${message.author} - ⏸ paused the music.`)
      } catch (error) {
        return current_server.text_channel.send(error);
      }
    }
  }
};