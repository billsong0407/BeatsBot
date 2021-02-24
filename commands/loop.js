const { validate_queue, validate_voice_channel } = require("../utility/validation")

module.exports = {
  name: "loop",
  description: "Loop the currently playing song",
  execute(message) {
    let check = validate_queue(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);
    check = validate_voice_channel(message);
    if (check != "success")
      return message.channel.send(check).catch(console.error);
    
    const current_server = message.client.servers.get(message.guild.id);
    current_server.loop = !current_server.loop;
    song = current_server.waiting_list[0];
    return current_server.text_channel.send(`${message.author} - ${current_server.loop ? "🔄" : "🛑"} Loop is ${current_server.loop ? "**enabled**" : "**diabled**"} for ${song.title}`).catch(console.error);
  }
};