# BeatsBot
An Discord AI that plays music and musical-related games in a Discord channel.

Built with Node.js, Tested with Jest, Deployed on Heroku.

### Requirements

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. YouTube Data API v3 Key **[Guide](https://developers.google.com/youtube/v3/getting-started)**  
3. Node.js v12.0.0 or newer **[Guide](https://nodejs.org/en/)**

### Set up
In project directory, run
```
npm install
```

### Configuration

Rename `config_json.example` to `config.json` and fill out the values:

*Note: Don't commit or share your token publicly*

```json
{
  "TOKEN": "", // Put your discord token here
  "MAX_PLAYLIST_SIZE": 10,
  "PREFIX": "/",
  "PRUNING": false,
  "STAY_TIME": 30,
  "DEFAULT_VOLUME": 50
}
```