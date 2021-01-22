const { DEFAULT_VOLUME } = require("../utility/util");

module.exports = {
    create_queue(msg){
        const queue = {};
        queue.textChannel = msg.channel;
        queue.channel = msg.member.voice.channel;
        queue.connection = null;
        queue.waiting_list = [];
        queue.loop = false;
        queue.volume = DEFAULT_VOLUME || 100;
        queue.playing = true;
        return queue;
    },
}