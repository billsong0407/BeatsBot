module.exports = {
  name: "loop",
  description: "Loop the currently playing song",
  execute(message) {
    const current_server = message.client.servers.get(message.guild.id);
    if (!current_server) return message.reply("No songs are currently playing.").catch(console.error);
    if (message.member.voice.channelID != message.member.guild.voice.channelID) return message.reply("You must join a voice channel first");

    current_server.loop = !current_server.loop;
    return current_server.text_channel.send(`Loop is now ${current_server.loop ? "**on**" : "**off**"}`).catch(console.error);
  }
};