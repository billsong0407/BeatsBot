const { validate_queue, validate_voice_channel } = require("../utility/validation")

module.exports = {
  name: "shuffle",
  description: "Shuffle queue",
  execute(message) {
    let check = validate_queue(message);
    if (check != "success")
        return message.channel.send(check);
    check = validate_voice_channel(message);
    if (check != "success")
        return message.channel.send(check).catch(console.error);

    const current_server = message.client.servers.get(message.guild.id);

    let queue = current_server.waiting_list;
    for (let i = queue.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    current_server.waiting_list = queue;
    message.client.servers.set(message.guild.id, current_server);
    current_server.text_channel.send(`${message.author} 🔀 shuffled the queue`).catch(console.error);
  }
};