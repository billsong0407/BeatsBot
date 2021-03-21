const { validate_queue, validate_voice_channel } = require("../utility/validation")

module.exports = {
  name: "volume",
  description: "Change volume of currently playing music",
  execute(message, args) {
    let check = validate_queue(message);
    if (check != "success")
        return message.channel.send(check);
    check = validate_voice_channel(message);
    if (check != "success")
        return message.channel.send(check);

    const current_server = message.client.servers.get(message.guild.id);

    const volume = args[0]
    if (!volume) return message.reply(`🔊 The current volume is: **${current_server.volume}%**`);
    if (isNaN(volume)) return message.reply("Please enter a number to set the volume");
    if (volume > 100 || volume < 0)
      return message.reply("Please enter a number between 0 - 100");

    current_server.volume = volume;
    current_server.connection.dispatcher.setVolumeLogarithmic(volume / 100);

    return current_server.text_channel.send(`Volume is adjusted to: **${volume}%**`);
  }
};