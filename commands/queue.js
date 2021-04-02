const { MessageEmbed } = require("discord.js");
const { validate_queue, validate_voice_channel } = require("../utility/validation");

module.exports = {
  name: "queue",
  cooldown: 5,
  description: "Show the music queue and now playing.",
  async execute(message) {
    let check = validate_queue(message);
    if (check != "success")
        return message.channel.send(check);
    check = validate_voice_channel(message);
    if (check != "success")
        return message.channel.send(check).catch(console.error);

    const current_server = message.client.servers.get(message.guild.id);

    const embed = list_each_song(current_server.waiting_list);

    return message.channel.send(embed);
  }
};

function list_each_song(queue) {
    let j = 0;
    const info = queue.map((song) => `${++j} - [${song.title}](${song.url})`).join("\n");

    const embed = new MessageEmbed()
        .setTitle("Songs In Queue\n")
        .setColor("#E91E63")
        .setDescription(`**Currently Playing - [${queue[0].title}](${queue[0].url})**\n\n${info}`)
        .setTimestamp();
  return embed;
}