module.exports = {
  name: "loop",
  description: "Loop the currently playing song",
  execute(message) {
    const current_server = message.client.servers.get(message.guild.id);
    if (!current_server) return message.channel.send(`⚠️ ${message.author}No songs are currently playing.`).catch(console.error);
    if (message.member.voice.channelID != message.member.guild.voice.channelID) return message.channel.send(`⚠️ ${message.author} You must join a voice channel first!`);

    current_server.loop = !current_server.loop;
    song = current_server.waiting_list[0];
    return current_server.text_channel.send(`${current_server.loop ? "🔄" : "🛑"} Loop is ${current_server.loop ? "**enabled** 🔄" : "**diabled** 🛑"} for ${song.title}`).catch(console.error);
  }
};