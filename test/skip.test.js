const { Client, TextChannel, Message, Member, Guild, Connection } = require("./mock");
const { create_queue } = require('../utility/queue');
const { create_server } = require('./mock_server');
const skip = require('../commands/skip').execute

test('send', ()=>{
    const msg = Message;
    const channel = TextChannel;
    channel.guild = 1234;
    const member = Member;
    msg.channel = channel;
    msg.member = member;
    member.voice.channel = channel;
    server = create_queue(msg);
    server.connection = Connection;
    server.waiting_list.push("Jingle Bell");
    server.waiting_list.push("Frozen");
    const client = Client;
    client.servers.set(1234,server);
    msg.client = client;
    msg.guild = Guild;
    skip(msg);
    expect(client.servers.get(1234).waiting_list).toStrictEqual(["Jingle Bell", "Frozen"]);
    // skip(msg);
    // expect(client.servers.get(1234).waiting_list).toStrictEqual(["Frozen"]);
})

test('send1', ()=>{
    const msg = Message;
    const channel = TextChannel;
    channel.guild = 1234;
    const member = Member;
    msg.channel = channel;
    msg.member = member;
    member.voice.channel = channel;
    server = create_server(msg);
    server.waiting_list.push("Jingle Bell");
    server.waiting_list.push("Frozen");
    const client = Client;
    client.servers.set(1234,server);
    msg.client = client;
    msg.guild = Guild;
    skip(msg);
    expect(client.servers.get(1234).waiting_list).toStrictEqual(["Frozen"]);
    // skip(msg);
    // expect(client.servers.get(1234).waiting_list).toStrictEqual(["Frozen"]);
})