module.exports = {
  name: "ping",
  cooldown: 10,
  description: "Reveal the bot's average ping",
  execute(message) {
    message.reply(` - 📶 Average ping to server: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
  }
};