const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Manual for using the commands",
  execute(message) {
    let commands = message.client.commands.array();

    let user_manual = new MessageEmbed()
      .setTitle("BeatsBot User Manual")
      .setDescription("List of all commands")
      .setColor("#9B59B6");

    for(const command of commands){
      user_manual.addField(
        `**$${command.name} ${command.aliases ? `(${command.aliases})` : ""}**`,
        `${command.description}`,
        true
      );
    }
    return message.channel.send(user_manual).catch(console.error);
  }
};
