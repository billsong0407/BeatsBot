const emoji = require("./emoji");

exports.validate_queue = (message) => {
    const current_server = message.client.servers.get(message.guild.id);
    if (!current_server)
        return `${message.author} - ${emoji.warning} No songs are currently playing.`;
    else
        return "success";
}

exports.validate_voice_channel = (message) => {
    if (message.member.voice.channelID != message.member.guild.voice.channelID) 
        return `${message.author} - ${emoji.warning} You must join a voice channel first!`;
    else
        return "sucess";
}