const { Client, TextChannel, Message, Member, Guild } = require("./mock/mock_general");
const { create_song } = require('./mock/mock_song');
const { create_server } = require('./mock/mock_server');
const pause = require('../commands/pause').execute;

describe('test pause command', ()=>{

    let msg = Message;
    let client = Client;
    let channel = TextChannel;
    let member = Member;

    beforeEach(() =>{
        channel.guild = 1234;
        member.voice = {};
        member.voice.channelID = 1234;
        member.guild = {};
        member.guild.voice = {
            channelID: 1234,
        }
        msg.channel = channel;
        msg.member = member;
        member.voice.channel = channel;
        server = create_server(msg);
        song1 = create_song("Jingle Bell", "h1", 30);
        server.waiting_list.push(song1);
        client.servers.set(1234,server);
        msg.client = client;
        msg.guild = Guild;
    });

    test('TC-FR: pause current playing song', ()=>{
        server = client.servers.get(1234);
        expect(server.playing).toBe(true);
        pause(msg);
        expect(server.playing).toBe(false);
    });
})