module.exports = {
  name: "uptime",
  description: "Shows the amount of time that the bot is online",
  execute(message) {
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    return message
      .reply(`Uptime: \`${days} day(s),${hours %= 24} hours, ${minutes %= 60} minutes, ${seconds %= 60} seconds\``)
      .catch(console.error);
  }
};