const { Client, TextChannel, Message, Member, Guild } = require("./mock/mock_general");
const { create_song } = require('./mock/mock_song');
const { create_server } = require('./mock/mock_server');
const volume = require('../commands/volume').execute

describe('test skip command', ()=>{

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

    test('TC-FR: change volume to 80%', ()=>{
        volume(msg, [80]);
        expect(channel.content).toBe(" - 🎧 Volume is adjusted to: **80%**");
    });

    test('TC-FR: change volume to 20%', ()=>{
        volume(msg, [20]);
        expect(channel.content).toBe(" - 🎧 Volume is adjusted to: **20%**");
    });

    test('TC-FR: check current volume', ()=>{
        volume(msg, []);
        expect(channel.content).toBe(" - 🎧 The current volume is: **100%**");
    });

    test('TC-FRE: input volume is not a number', ()=>{
        volume(msg, ["e"]);
        expect(channel.content).toBe(" - ⚠️ Please enter a number to set the volume");
    });

    test('TC-FRE: input volume < 0', ()=>{
        volume(msg, [-1]);
        expect(channel.content).toBe(" - ⚠️ Please enter a number between 0 - 100");
    });
})