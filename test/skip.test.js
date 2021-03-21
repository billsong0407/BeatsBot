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
        song2 = create_song("Frozen", "h1", 30);
        server.waiting_list.push(song1);
        server.waiting_list.push(song2);
        client.servers.set(1234,server);
        // console.log(client.servers.get(1234).waiting_list);
        msg.client = client;
        msg.guild = Guild;
    });

    test('TC-FR: skip 1 song', ()=>{
        skip(msg);
        server = client.servers.get(1234);
        expect(server.waiting_list.length).toBe(1);
        expect(server.waiting_list[0].title).toBe("Frozen");
        expect(channel.content).toBe("TestUser1 - ⏭️ skipped Jingle Bell");
    });

    test('TC-FR: skip 2 songs', ()=>{
        skip(msg);
        expect(channel.content).toBe("TestUser1 - ⏭️ skipped Jingle Bell");
        skip(msg);
        expect(channel.content).toBe("TestUser1 - ⏭️ skipped Frozen");
        expect(client.servers.get(1234).waiting_list.length).toBe(0);
    });

    test('TC-FR: skip to the second song in the index', ()=>{
        msg.client.servers.get(msg.guild.id).waiting_list.push(create_song("Diamond", "h1", 30));
        skip(msg, [2]);
        server = client.servers.get(1234);
        expect(client.servers.get(1234).waiting_list.length).toBe(2);
        expect(channel.content).toBe("TestUser1 - ⏭ skipped 1 songs");
    });

    test('TC-FRE: input index > queue length', ()=>{
        skip(msg, [10]);
        expect(channel.content).toBe("The queue is only 2 songs long!");
    });

    test('TC-FRE: input index is not a number', ()=>{
        skip(msg, ["hi"]);
        expect(channel.content).toBe("Error: Please enter an integer after $skip");
    });
})