require('dotenv').config();

let config;

try {
  config = require("../config.json");
} catch (error) {
  config = null;
}

module.exports = {
    TOKEN: config ? config.TOKEN : process.env.TOKEN,
    PREFIX: config ? config.PREFIX : process.env.PREFIX,
    PRUNING: config ? config.PRUNING : process.env.PRUNING,
    STAY_TIME: config ? config.STAY_TIME : process.env.STAY_TIME | 0,
    DEFAULT_VOLUME: config ? config.DEFAULT_VOLUME: process.env.DEFAULT_VOLUME | 0,
};