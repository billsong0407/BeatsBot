let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
    TOKEN: config.TOKEN,
    PREFIX: config.PREFIX,
    YOUTUBE_API_KEY: config.YOUTUBE_API_KEY,
    SOUNDCLOUD_CLIENT_ID: config.SOUNDCLOUD_CLIENT_ID,
    MAX_PLAYLIST_SIZE: config.MAX_PLAYLIST_SIZE,
    PRUNING: config.PRUNING,
    STAY_TIME: config.STAY_TIME,
    DEFAULT_VOLUME: config.DEFAULT_VOLUME,
};
// exports.TOKEN = config.TOKEN;
// exports.PREFIX = config ? config.PREFIX : process.env.PREFIX;
// exports.YOUTUBE_API_KEY = config ? config.YOUTUBE_API_KEY : process.env.YOUTUBE_API_KEY;
// exports.SOUNDCLOUD_CLIENT_ID = config ? config.SOUNDCLOUD_CLIENT_ID : process.env.SOUNDCLOUD_CLIENT_ID;
// exports.MAX_PLAYLIST_SIZE = config ? config.MAX_PLAYLIST_SIZE : process.env.MAX_PLAYLIST_SIZE;
// exports.PRUNING = config ? config.PRUNING : process.env.PRUNING;
// exports.STAY_TIME = config ? config.STAY_TIME : process.env.STAY_TIME;
// exports.DEFAULT_VOLUME = config ? config.DEFAULT_VOLUME: process.env.DEFAULT_VOLUME;