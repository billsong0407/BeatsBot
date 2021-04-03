exports.show_GUI = async (message, server) => {
    current_song = server.waiting_list[0];

    try {
      var music_GUI = await server.text_channel.send(`🎶 Currently playing: **${current_song.title}**`);
      await music_GUI.react("⏭");
      await music_GUI.react("⏯");
      await music_GUI.react("🔇");
      await music_GUI.react("🔉");
      await music_GUI.react("🔊");
      await music_GUI.react("🔁");
      await music_GUI.react("⏹");
    } catch (error) {
        console.error(error);
    }

    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector = music_GUI.createReactionCollector(filter, {
      time: current_song.duration > 0 ? current_song.duration * 1000 : 600000
    });

    collector.on("collect", (reaction, user) => {
      if (!server) return;
      const member = message.guild.member(user);
      if (member.voice.channelID !== member.guild.voice.channelID) {
        member.send("${user} - ❌ You need to join the voice channel first!").catch(console.error);
        return;
      }
    
    //   let current_volume = server.volume;

    switch (reaction.emoji.name) {
      case "⏭":
        server.playing = true;
        reaction.users.remove(user).catch(console.error);
        server.connection.dispatcher.end();
        server.text_channel.send(`${user} - ⏩ skipped the song`).catch(console.error);
        collector.stop();
        break;

      case "⏯":
        reaction.users.remove(user).catch(console.error);
        if (server.playing) {
          server.playing = !server.playing;
          server.connection.dispatcher.pause(true);
          server.text_channel.send(`${user} - ⏸ paused the music.`).catch(console.error);
        } else {
          server.playing = !server.playing;
          server.connection.dispatcher.resume();
          server.text_channel.send(`${user} - ▶ resumed the music!`).catch(console.error);
        }
        break;

      case "🔁":
        reaction.users.remove(user).catch(console.error);
        server.loop = !server.loop;
        server.text_channel.send(`Loop is now ${server.loop ? "**on**" : "**off**"}`).catch(console.error);
        break;

      case "🔉":
        reaction.users.remove(user).catch(console.error);
        if (server.volume - 10 <= 0) server.volume = 0;
        else server.volume = server.volume - 10;
        server.connection.dispatcher.setVolumeLogarithmic(server.volume / 100);
        server.text_channel
          .send(`${user} 🔉 decreased the volume, the volume is now ${server.volume}%`)
          .catch(console.error);
        break;

      case "🔊":
        reaction.users.remove(user).catch(console.error);
        if (server.volume + 10 >= 100) server.volume = 100;
        else server.volume = server.volume + 10;
        server.connection.dispatcher.setVolumeLogarithmic(server.volume / 100);
        server.text_channel
          .send(`${user} 🔊 increased the volume, the volume is now ${server.volume}%`)
          .catch(console.error);
        break;

      case "🔇":
        reaction.users.remove(user).catch(console.error);
        if (server.volume <= 0) {
          server.volume = 100;
          server.connection.dispatcher.setVolumeLogarithmic(100 / 100);
          server.text_channel.send(`${user} 🔊 unmuted the music!`).catch(console.error);
        } else {
          server.volume = 0;
          server.connection.dispatcher.setVolumeLogarithmic(0);
          server.text_channel.send(`${user} 🔇 muted the music!`).catch(console.error);
        }
        break;

      case "⏹":
        reaction.users.remove(user).catch(console.error);
        server.waiting_list = [];
        server.text_channel.send(`${user} - ⏹ stopped the music!`).catch(console.error);
        try {
          server.connection.dispatcher.end();
        } catch (error) {
          console.error(error);
          server.connection.disconnect();
        }
        collector.stop();
        break;

        default:
          reaction.users.remove(user).catch(console.error);
          break;
        }
    });

    collector.on("end", () => {
      music_GUI.reactions.removeAll().catch(console.error);
      if (music_GUI && !music_GUI.deleted) {
        music_GUI.delete({ timeout: 3000 }).catch(console.error);
      }
    });
}