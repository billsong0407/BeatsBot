const { DEFAULT_VOLUME } = require("../utility/util");

module.exports = {
    queue: {
        textChannel: null,
        channel: null,
        connection: null,
        songs: [],
        loop: false,
        volume: DEFAULT_VOLUME || 100,
        playing: true
    },
};