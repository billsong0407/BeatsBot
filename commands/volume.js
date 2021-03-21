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
        return message.channel.send(check).catch(console.error);

    const current_server = message.client.servers.get(message.guild.id);

    const volume = args[0]
    if (!volume) return message.reply(`🔊 The current volume is: **${current_server.volume}%**`).catch(console.error);
    if (isNaN(volume)) return message.reply("Please use a number to set volume.").catch(console.error);
    if (volume > 100 || volume < 0)
      return message.reply("Please use a number between 0 - 100.").catch(console.error);

    current_server.volume = volume;
    current_server.connection.dispatcher.setVolumeLogarithmic(volume / 100);

    return current_server.text_channel.send(`Volume set to: **${volume}%**`).catch(console.error);
  }
};