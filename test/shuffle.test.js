const { Client, TextChannel, Message, Member, Guild } = require("./mock/mock_general");
const { create_song } = require('./mock/mock_song');
const { create_server } = require('./mock/mock_server');
const shuffle = require('../commands/shuffle').execute;

describe('test shuffle command', ()=>{

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

    test('TC-FR: Shuffle queue containing multiple songs', ()=>{
        server = client.servers.get(1234);
        song2 = create_song("Frozen", "h1", 30);
        song3 = create_song("Circles", "h1", 30);
        song4 = create_song("Sheep", "h1", 30);
        server.waiting_list.push(song2);
        server.waiting_list.push(song3);
        server.waiting_list.push(song4);
        let original_queue = server.waiting_list;
        shuffle(msg);

        // check if the queue still have the same number of songs
        expect(server.waiting_list.length).toBe(4);

        // The first song in the queue will not change, since the first song is the current playing song
        expect(server.waiting_list[0].title).toBe("Jingle Bell");

        // The new shuffled queue will have different order than the original one
        !expect(original_queue).toBe(server.waiting_list);
        expect(channel.content).toBe("TestUser1 - 🔀 shuffled the queue");
    });

    test('TC-FR: Shuffle queue containing 1 song', ()=>{
        server = client.servers.get(1234);
        let original_queue = server.waiting_list;
        shuffle(msg);

        // check if the queue still have the same number of songs
        expect(server.waiting_list.length).toBe(1);

        // The first song in the queue will not change, since the first song is the current playing song
        expect(server.waiting_list[0].title).toBe("Jingle Bell");

        // The new shuffled queue should have the same order as the original one
        expect(original_queue).toBe(server.waiting_list);
        expect(channel.content).toBe("TestUser1 - 🔀 shuffled the queue");
    });
})