const { create_queue } = require('../utility/queue');

test("test song object construction", () => {
    const msg = {};
    const voice = {};
    const member = {};
    voice.channel = null;
    msg.channel = null;
    msg.member = member;
    msg.member.voice = voice;
    server = create_queue(msg);
    expect(server.text_channel).toBe(null);
    expect(server.volume).toBe(100);
});