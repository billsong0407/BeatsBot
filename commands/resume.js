const { validate_queue, validate_voice_channel } = require("../utility/validation")

module.exports = {
  name: "resume",
  description: "Resume currently paused song",
  execute(message) {
    let check = validate_queue(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);
    check = validate_voice_channel(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);
    const current_server = message.client.servers.get(message.guild.id);

    try {
      if (!current_server.playing) {
        current_server.playing = true;
        current_server.connection.dispatcher.resume();
        return current_server.text_channel.send(`${message.author} - ▶️ resumed the music!`);
      }
      return message.reply("The music is still playing.");
    } catch (error) {
      return current_server.text_channel.send(error);
    } 
  }
};
