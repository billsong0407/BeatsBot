const { Client, TextChannel, Message, Member, Guild } = require("./mock/mock_general");
const { create_song } = require('./mock/mock_song');
const { create_server } = require('./mock/mock_server');
const skip = require('../commands/skip').execute

describe('test skip command', ()=>{

    let msg = Message;
    let client = Client;
    let channel = TextChannel;
    let member = Member;

    beforeEach(() =>{
        channel.guild = 1234;
        msg.channel = channel;
        msg.member = member;
        member.voice.channel = channel;
        server = create_server(msg);
        song1 = create_song("Jingle Bell", "h1", 30);
        song2 = create_song("Frozen", "h1", 30);
        server.waiting_list.push(song1);
        server.waiting_list.push(song2);
        client.servers.set(1234,server);
        msg.client = client;
        msg.guild = Guild;
    });

    test('skip 1 song', ()=>{
        skip(msg);
        expect(client.servers.get(1234).waiting_list.length).toBe(1);
        expect(client.servers.get(1234).waiting_list[0].title).toBe("Frozen");
        expect(channel.content).toBe("TestUser1 - ⏭️ skipped Jingle Bell");
    });
    test('skip 2 songs', ()=>{
        skip(msg);
        expect(channel.content).toBe("TestUser1 - ⏭️ skipped Jingle Bell");
        skip(msg);
        expect(channel.content).toBe("TestUser1 - ⏭️ skipped Frozen");
        expect(client.servers.get(1234).waiting_list.length).toBe(0);
    });
})